export class CredentialsChange {
  constructor(
    public username?: string,
    public email?: string,
    public newPassword?: string,
    public password?: string
  ) {}
}
