import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  ObjectLiteral,
  Repository,
  FindManyOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/pagination.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    q: PaginationQueryDto,
    repository: Repository<T> | SelectQueryBuilder<T>,
    options: FindManyOptions<T> = {},
  ): Promise<Paginated<T>> {
    const page = Math.max(1, Number(q.page ?? 1));
    const limit = Math.max(1, Number(q.limit ?? 10));
    const skip = (page - 1) * limit;

    let data: T[] = [];
    let matched: number = 0;

    if (repository instanceof Repository) {
      [data, matched] = await repository.findAndCount({
        ...options,
        take: limit,
        skip,
      });
    } else {
      data = await repository.limit(limit).offset(skip).getMany();
      matched = await repository.getCount();
    }

    const baseURL = `${this.request.protocol}://${this.request.headers.host}`;
    const url = new URL(this.request.url, baseURL);
    url.searchParams.set('limit', String(limit));

    const totalPagesRaw = Math.ceil(matched / limit);
    const totalPages = Math.max(1, totalPagesRaw || 1);
    const currentPage = Math.min(page, totalPages);

    const make = (p: number) => {
      const u = new URL(url.toString());
      u.searchParams.set('page', String(p));
      return u.toString();
    };

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return {
      data,
      meta: {
        itemsPerPage: limit,
        totalItems: matched,
        currentPage,
        totalPages,
      },
      links: {
        first: make(1),
        last: make(totalPages),
        current: make(currentPage),
        prev: hasPrev ? make(currentPage - 1) : '',
        next: hasNext ? make(currentPage + 1) : '',
      },
    };
  }
}
