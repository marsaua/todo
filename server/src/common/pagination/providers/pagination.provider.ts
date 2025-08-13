import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ObjectLiteral, Repository, FindManyOptions } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/pagination.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    //Inject request
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    options: FindManyOptions<T> = {},
  ): Promise<Paginated<T>> {
    const limit = Number(paginationQuery.limit) || 10;
    const page = Number(paginationQuery.page) || 1;
    const skip = (page - 1) * limit;

    const order =
      options.order ?? ({ id: 'DESC' } as FindManyOptions<T>['order']);

    const [results, totalItems] = await repository.findAndCount({
      ...options, // важливо — де є where/relations
      take: limit,
      skip,
      order,
    });

    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const url = new URL(this.request.url, baseURL);

    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const currentPage = Math.min(page, totalPages);
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    const makeLink = (p: number) =>
      `${url.origin}${url.pathname}?limit=${limit}&page=${p}`;

    return {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage,
        totalPages,
      },
      links: {
        first: makeLink(1),
        last: makeLink(totalPages),
        current: makeLink(currentPage),
        next: makeLink(nextPage),
        prev: makeLink(prevPage),
      },
    };
  }
}
