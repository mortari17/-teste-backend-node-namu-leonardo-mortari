import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ListGlobalRequest {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  page: number = 1;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  page_size: number = 25;
}

export class ListGlobalResponse<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  page_size: number;

  @ApiProperty()
  total: number;
}

export class DeleteGlobalInfoResponse {
  @ApiProperty()
  success: boolean;
}
