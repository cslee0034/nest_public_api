import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from '../department.service';
import { DepartmentRepository } from '../repository/employee.repository';

const mockDepartmentRepository = () => ({
  findOne: jest.fn(),
  findLocation: jest.fn(),
  updateSalary: jest.fn(),
});

describe('DepartmentService', () => {
  let spyDepartmentService: DepartmentService;
  let spyDepartmentRepository: DepartmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        { provide: DepartmentRepository, useFactory: mockDepartmentRepository },
      ],
    }).compile();

    spyDepartmentService = module.get<DepartmentService>(DepartmentService);
    spyDepartmentRepository =
      module.get<DepartmentRepository>(DepartmentRepository);
  });

  describe('FindDepartment', () => {
    it('부서 찾기 성공', async () => {
      const id = 100;
      // Method Mocking
      (spyDepartmentRepository.findOne as jest.Mock).mockReturnValue({
        employee_id: 100,
      });
      // Excuute
      const result = await spyDepartmentService.findOne(id);
      // Expect
      expect(spyDepartmentRepository.findOne).toBeCalled();
      expect(spyDepartmentRepository.findOne).toBeCalledWith(id);
      expect(result).toEqual({
        employee_id: 100,
      });
    });

    it('부서 찾기 실패', async () => {
      const id = 99;
      // Method Mocking
      (spyDepartmentRepository.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException(),
      );
      try {
        // Excuute
        const result = await spyDepartmentService.findOne(id);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('FindLocation', () => {
    it('부서 위치 찾기 성공', async () => {
      const id = 10;
      // Method Mocking
      (spyDepartmentRepository.findLocation as jest.Mock).mockReturnValue({
        location_id: 10,
      });
      // Excuute
      const result = await spyDepartmentService.findLocation(id);
      // Expect
      expect(spyDepartmentRepository.findLocation).toBeCalled();
      expect(spyDepartmentRepository.findLocation).toBeCalledWith(id);
      expect(result).toEqual({
        location_id: 10,
      });
    });

    it('부서 위치 찾기 실패', async () => {
      const id = 11;
      // Method Mocking
      (spyDepartmentRepository.findLocation as jest.Mock).mockRejectedValue(
        new NotFoundException(),
      );
      try {
        // Excuute
        const result = await spyDepartmentService.findLocation(id);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('UpdateSalary', () => {
    it('급여 인상 성공', async () => {
      const id = 10;
      const body = { upper: '10' };
      // Method Mocking
      (spyDepartmentRepository.updateSalary as jest.Mock).mockReturnValue({
        status: 200,
        success: true,
      });
      // Excuute
      const result = await spyDepartmentService.updateSalary(id, body);
      // Expect
      expect(spyDepartmentRepository.updateSalary).toBeCalled();
      expect(spyDepartmentRepository.updateSalary).toBeCalledWith(id, body);
      expect(result).toEqual({ status: 200, success: true });
    });

    it('급여 인상 실패(id 없음)', async () => {
      const id = 11;
      const body = { upper: '10' };
      // Method Mocking
      (spyDepartmentRepository.updateSalary as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excuute
        const result = await spyDepartmentService.updateSalary(id, body);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('급여 인상 실패(body.upper 없음)', async () => {
      const id = 10;
      const body = { upper: null };
      // Method Mocking
      (spyDepartmentRepository.updateSalary as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excuute
        const result = await spyDepartmentService.updateSalary(id, body);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
