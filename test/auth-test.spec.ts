import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { CreateUserDto } from '../src/auth/dto/create-user.dto';
import { LoginUserDto } from '../src/auth/dto/login-user.dto';
import { UpdateUserDto } from '../src/auth/dto/update-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'Password123',
      };
      const expectedResult = { id: 1, ...createUserDto };

      jest.spyOn(authService, 'create').mockResolvedValue(expectedResult);

      const result = await authController.create(createUserDto);

      expect(result).toBe(expectedResult);
    });
  });

  describe('loginUser', () => {
    it('should log in a user', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john@example.com',
        password: 'Password123',
      };
      const expectedResult = { accessToken: 'your-access-token' };

      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);

      const result = await authController.loginUser(loginUserDto);

      expect(result).toBe(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'someId';
      const updateUserDto: UpdateUserDto = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
      };
      const expectedResult = { id: userId, ...updateUserDto };

      jest.spyOn(authService, 'update').mockResolvedValue(expectedResult);

      const result = await authController.update(userId, updateUserDto);

      expect(result).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const userId = 'someId';
      const expectedResult = { id: userId, firstName: 'John' };

      jest.spyOn(authService, 'findOne').mockResolvedValue(expectedResult);

      const result = await authController.findOne(userId);

      expect(result).toBe(expectedResult);
    });
  });
});
