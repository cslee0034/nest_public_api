import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmployeeFindHistory } from '../interfaces/findHistory.type';
import { EmployeeFindOne } from '../interfaces/findOne.type';
import { EmployeeUpdateOne } from '../interfaces/updateOne.type';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly connection: DataSource) {}

  async findOne(id: number): Promise<EmployeeFindOne> {
    try {
      const query = `SELECT * FROM employees WHERE employee_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      throw new NotFoundException('error while find employee');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }

  async findOneHistory(id: number): Promise<EmployeeFindHistory> {
    try {
      const query = `SELECT * FROM job_history WHERE employee_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      throw new NotFoundException('error while find employee history');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }

  async updateOne(
    id: number,
    body: EmployeeUpdateOne,
  ): Promise<{ status: number; success: boolean }> {
    // body에 있는 요소를 query 문으로 변환
    const setQuerys = Object.keys(body).map((key) => {
      if (body[key] !== undefined) {
        return `${key} = '${body[key]}'`;
      }
    });
    const setQuery = setQuerys.join(', ');

    // SQL query
    try {
      const query = `UPDATE employees SET ${setQuery} WHERE employee_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('error while update employee');
      // 내부 서버 에러 500
    }
  }
}
