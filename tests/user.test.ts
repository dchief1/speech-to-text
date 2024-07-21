import { describe, it, expect, beforeEach, vi } from "vitest";
import { createUser } from "../src/services/user.service";
import { connectDb } from "../src/config/database";
import bcrypt from "bcrypt";
import ConflictError from "../src/errors/conflict";

vi.mock("../src/config/database");
vi.mock("bcrypt");

describe("createUser", () => {
  const mockUser = {
    username: "kelz",
    password: "testpassword",
    email: "test1@mailinator.com",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    const createdUser = {
      ...mockUser,
      password: "hashedPassword",
      id: 1,
      createdAt: new Date(),
    };

    (connectDb.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue([]),
    });
    (bcrypt.hash as any).mockResolvedValue("hashedPassword");
    (connectDb.insert as any).mockReturnValueOnce({
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([createdUser]),
    });
    (connectDb.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue([createdUser]),
    });

    const result = await createUser(mockUser);

    // Remove createdAt from the expected result
    const { createdAt, ...expectedData } = createdUser;
    const { createdAt: resultCreatedAt, ...resultData } = result.data;

    expect(result).toEqual({
      status: true,
      message: "User Created",
      data: { ...expectedData, createdAt: resultCreatedAt },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
  });

  it("should throw ConflictError if user already exists", async () => {
    (connectDb.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue([mockUser]),
    });

    await expect(createUser(mockUser)).rejects.toThrow(ConflictError);
  });
});
