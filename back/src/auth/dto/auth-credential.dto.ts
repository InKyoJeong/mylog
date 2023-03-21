import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^([a-z0-9_]+)$/, {
    message: '아이디는 영어 소문자, 숫자, 언더바(_) 조합으로 입력해주세요.',
  })
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영어 또는 숫자 조합으로 입력해주세요.',
  })
  password: string;
}
