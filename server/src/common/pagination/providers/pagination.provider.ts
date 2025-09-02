import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  ObjectLiteral,
  Repository,
  FindManyOptions,
  FindOptionsOrder,
  SelectQueryBuilder,
} from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/pagination.interface';

@Injectable({ scope: Scope.REQUEST })
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    q: PaginationQueryDto,
    repository: Repository<T> | SelectQueryBuilder<T>,
    options: FindManyOptions<T> = {},
    defaultOrder?: FindOptionsOrder<T>,
  ): Promise<Paginated<T>> {
    const page = Math.max(1, Number.isFinite(+q.page!) ? Number(q.page) : 1);
    const limit = Math.max(
      1,
      Number.isFinite(+q.limit!) ? Number(q.limit) : 10,
    );
    const skip = (page - 1) * limit;

    let data: T[] = [];
    let matched = 0;

    if (repository instanceof Repository) {
      const effectiveOrder = options.order ?? defaultOrder;
      [data, matched] = await repository.findAndCount({
        ...options,
        order: effectiveOrder,
        take: limit,
        skip,
      });
    } else {
      const qb = repository;
      const hasOrder =
        qb.expressionMap.orderBys &&
        Object.keys(qb.expressionMap.orderBys).length > 0;

      if (!hasOrder && defaultOrder) {
        const alias = qb.expressionMap.mainAlias?.name ?? qb.alias;
        for (const [key, val] of Object.entries(defaultOrder)) {
          const dir =
            (typeof val === 'string' ? val : (val as any)?.direction) || 'ASC';
          qb.addOrderBy(
            `${alias}.${String(key)}`,
            (dir.toUpperCase() as 'ASC' | 'DESC') || 'ASC',
          );
        }
      }

      const countQb = qb.clone();
      data = await qb.limit(limit).offset(skip).getMany();
      matched = await countQb.limit(undefined).offset(undefined).getCount();
    }

    const host = this.request.headers.host || 'localhost';
    const protocol =
      (this.request.headers['x-forwarded-proto'] as string) ||
      this.request.protocol ||
      'http';
    const baseURL = `${protocol}://${host}`;
    const url = new URL(this.request.url || '/', baseURL);
    url.searchParams.set('limit', String(limit));

    const totalPages = Math.max(1, Math.ceil(matched / limit));
    const currentPage = Math.min(page, totalPages);

    const make = (p: number) => {
      const u = new URL(url.toString());
      u.searchParams.set('page', String(p));
      return u.toString();
    };

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
        prev: currentPage > 1 ? make(currentPage - 1) : '',
        next: currentPage < totalPages ? make(currentPage + 1) : '',
      },
    };
  }
}
