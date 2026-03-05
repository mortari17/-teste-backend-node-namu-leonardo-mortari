import { EnumProgramCategoryDTO } from '@modules/programs/dto/create-program.dto';
import { EnumProgramCategory } from '@shared/entity/program.entity';

export function parseCategory(
  category?: EnumProgramCategoryDTO,
): EnumProgramCategory | undefined {
  switch (category) {
    case EnumProgramCategoryDTO.MEDITATION:
      return EnumProgramCategory.MEDITATION;
    case EnumProgramCategoryDTO.EXERCISE:
      return EnumProgramCategory.EXERCISE;
    case EnumProgramCategoryDTO.NUTRITION:
      return EnumProgramCategory.NUTRITION;
    default:
      return undefined;
  }
}
