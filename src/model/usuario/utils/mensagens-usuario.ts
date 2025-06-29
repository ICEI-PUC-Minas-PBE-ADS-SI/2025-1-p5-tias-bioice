export class MensagensUsuario {
  static USUARIO_JA_EXISTE: string =
    'Já existe um usuário cadastrado na base dados com as informações fornecidas.';

  static USUARIO_NAO_EXISTE: string = `O usuário informado não existe na base de dados`;

  static USUARIO_EXCLUIDO(nome: string): string {
    return `O usuário de nome ${nome} foi excluído com sucesso`;
  }

  static USUARIO_CRIADO: string = 'Usuário criado com sucesso'

  static USUARIO_EDITADO: string = 'Usuário editado com sucesso'

  static IMPOSSIVEL_EXCLUIR_USUARIO: string =
    'Não é possível excluir o usuário informado, visto que ele possui relações com outras entidades.';

  static USUARIO_AUTENTICADO: string = 'Usuário autenticado com sucesso.';

  static EMAIL_OU_SENHA_INCORRETOS: string = 'O email ou a senha informados estão incorretos.';
}
