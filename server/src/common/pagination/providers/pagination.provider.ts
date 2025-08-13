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
    options?: FindManyOptions<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      ...options,
      take: paginationQuery.limit,
      skip: ((paginationQuery.page ?? 1) - 1) * (paginationQuery.limit ?? 10),
    });

    //Create the request URLs
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newResults = new URL(this.request.url, baseURL);
    //Calculate page numbers
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / (paginationQuery.limit ?? 10));
    const currentPage = paginationQuery.page ?? 1;
    const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;
    const nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit ?? 10,
        totalItems: totalItems,
        currentPage: paginationQuery.page ?? 1,
        totalPages: totalPages,
      },
      links: {
        first: `${newResults.origin}${newResults.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newResults.origin}${newResults.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newResults.origin}${newResults.pathname}?limit=${paginationQuery.limit}&page=${currentPage}`,
        next: `${newResults.origin}${newResults.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        prev: `${newResults.origin}${newResults.pathname}?limit=${paginationQuery.limit}&page=${prevPage}`,
      },
    };
    return finalResponse;
  }
}
