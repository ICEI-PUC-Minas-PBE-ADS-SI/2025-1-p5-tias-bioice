# Plano de testes de software

O plano de testes de software foi elaborado com base na Especificação do Sistema, tendo como objetivo garantir que os requisitos funcionais definidos no projeto sejam corretamente implementados e atendam às necessidades do usuário final. Para isso, foram desenvolvidos e executados casos de teste que cobrem as principais funcionalidades da aplicação.

# Cenários de Teste
Foram selecionados 16 cenários de teste, cada um relacionado diretamente a um ou mais requisitos funcionais definidos no sistema. Esses cenários foram projetados para verificar o comportamento da aplicação em situações reais de uso, assegurando que as funcionalidades essenciais estão operando conforme esperado.

Os testes foram realizados a partir da interface web da aplicação, em ambiente controlado, utilizando dados reais e simulados. O grupo de testes foi composto por integrantes da equipe de desenvolvimento e usuários convidados com diferentes perfis de acesso, incluindo:

* Administrador/Propriétario: responsável pela configuração e controle geral da aplicação.
* Funcionário: responsável pelas operações de rotina, como movimentação de estoque.

# Funcionalidades Avaliadas
A seguir, os cenários de teste selecionados com seus respectivos números, requisitos associados e objetivos principais:

* CT-001 – Gerenciar insumos	RF-001	Validar cadastro, edição e exclusão de insumos
* CT-002 – Registrar movimentação de insumos	RF-002	Confirmar controle de entrada e saída no estoque
* CT-003 – Alertas de vencimento	RF-003	Verificar geração de alertas de vencimento de insumos
* CT-004 – Controle financeiro	RF-004	Testar registro de receitas e despesas
* CT-005 – Categorização de gastos	RF-005	Avaliar agrupamento de despesas por categoria
* CT-006 – Relatórios financeiros	RF-006	Gerar relatórios de desempenho financeiro
* CT-007 – Gerenciamento de usuários	RF-007	Verificar criação de usuários com níveis de acesso distintos
* CT-008 – Registro limitado por acesso	RF-008	Validar permissões restritas para funcionários
* CT-009 – Notificações de estoque baixo	RF-009	Confirmar alertas automáticos de estoque insuficiente
* CT-010 – Monitoramento em tempo real	RF-010	Testar atualização dinâmica da quantidade em estoque
* CT-011 – Relatório de desperdício	RF-011	Validar relatórios sobre insumos descartados
* CT-012 – Alerta de despesas fora do padrão	RF-012	Identificar comportamentos financeiros anormais
* CT-013 – Definir metas financeiras	RF-013	Avaliar definição e acompanhamento de metas orçamentárias
* CT-014 – Indicadores ambientais	RF-014	Testar apresentação de métricas de impacto ambiental
* CT-015 – Cadastro de práticas sustentáveis	RF-015	Verificar inserção e visualização de práticas verdes
* CT-016 – Relatórios integrados	RF-016	Validar geração de relatórios com visão geral da empresa

Todos os casos de teste foram enumerados sequencialmente e associados corretamente aos seus respectivos requisitos funcionais, conforme definido na Especificação do Projeto. Os testes permitiram identificar melhorias e garantir que a aplicação cumpre seu propósito de forma eficiente, segura e amigável ao usuário.

Por exemplo:

|               **Caso de teste**              |                                                                                            **CT-001 – Gerenciar insumos**                                                                                           |
| :------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                                                                        RF-001 – Permitir o cadastro, edição e exclusão de insumos no estoque                                                                        |
|               Objetivo do teste              |                                                                  Verificar se o usuário consegue adicionar, editar e remover insumos corretamente.                                                                  |
|                    Passos                    | - Acessar o sistema com credenciais de administrador <br> - Navegar até a seção "Estoque" <br> - Cadastrar novo insumo preenchendo os campos obrigatórios <br> - Editar o insumo cadastrado <br> - Excluir o insumo |
|               Critério de êxito              |                                                                   - As operações de cadastro, edição e exclusão devem ser realizadas com sucesso.                                                                   |
| Responsável pela elaboração do caso de teste |                                                                                                      Danilo Lopes                                                                                                    |

|               **Caso de teste**              |                                                                       **CT-002 – Registrar movimentação de insumos**                                                                      |
| :------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                                                                 RF-002 – Registrar a entrada e saída de insumos no estoque                                                                |
|               Objetivo do teste              |                                                          Testar se o sistema registra corretamente entradas e saídas de insumos.                                                          |
|                    Passos                    | - Acessar o sistema <br> - Navegar até "Movimentação de Estoque" <br> - Registrar uma entrada de insumos <br> - Registrar uma saída de insumos <br> - Verificar atualização da quantidade |
|               Critério de êxito              |                                                        - A quantidade de insumos é atualizada corretamente após cada movimentação.                                                        |
| Responsável pela elaboração do caso de teste |                                                                                       Danilo Lopes                                                                                      |

|               **Caso de teste**              |                                          **CT-003 – Alertas de vencimento**                                         |
| :------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                        RF-003 – Gerar alertas automáticos para insumos próximos do vencimento                       |
|               Objetivo do teste              |                Verificar se o sistema notifica corretamente os insumos com data de validade próxima.                |
|                    Passos                    | - Inserir um insumo com validade próxima <br> - Aguardar o sistema processar <br> - Verificar se o alerta é exibido |
|               Critério de êxito              |                        - O sistema exibe alerta claro indicando insumo próximo do vencimento.                       |
| Responsável pela elaboração do caso de teste |                                                    Danilo Lopes                                                   |

|               **Caso de teste**              |                                                        **CT-004 – Controle financeiro**                                                       |
| :------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                                       RF-004 – Permitir o registro de receitas e despesas da sorveteria                                       |
|               Objetivo do teste              |                         Verificar se o sistema permite registrar entradas (receitas) e saídas (despesas) financeiras.                         |
|                    Passos                    | - Acessar o módulo financeiro <br> - Inserir dados de uma nova receita <br> - Inserir dados de uma nova despesa <br> - Verificar os registros |
|               Critério de êxito              |                                       - Os valores são armazenados e refletidos corretamente no sistema.                                      |
| Responsável pela elaboração do caso de teste |                                                                   Danilo Lopes                                                                  |

|               **Caso de teste**              |                                                **CT-005 – Categorização de gastos**                                               |
| :------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                                  RF-005 – Categorizar os gastos para análise financeira detalhada                                 |
|               Objetivo do teste              |                                   Garantir que os gastos possam ser classificados em categorias.                                  |
|                    Passos                    | - Acessar o módulo de despesas <br> - Inserir uma nova despesa com uma categoria <br> - Salvar e verificar listagem por categoria |
|               Critério de êxito              |                                      - A despesa aparece corretamente agrupada por categoria.                                     |
| Responsável pela elaboração do caso de teste |                                                             Danilo Lopes                                                            |

|               **Caso de teste**              |                                                  **CT-006 – Relatórios financeiros**                                                  |
| :------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                               RF-006 – Gerar relatórios financeiros para auxiliar na tomada de decisões                               |
|               Objetivo do teste              |                                 Verificar se o sistema gera relatórios financeiros com dados precisos.                                |
|                    Passos                    | - Inserir dados financeiros <br> - Acessar a seção de relatórios <br> - Selecionar período e tipo de relatório <br> - Gerar relatório |
|               Critério de êxito              |                                        - Relatório exibido corretamente com dados consistentes.                                       |
| Responsável pela elaboração do caso de teste |                                                               Danilo Lopes                                                              |

|               **Caso de teste**              |                                                          **CT-007 – Gerenciamento de usuários**                                                          |
| :------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                                 RF-007 – Permitir o cadastro e gerenciamento de usuários com diferentes níveis de acesso                                 |
|               Objetivo do teste              |                                     Validar se o sistema permite adicionar usuários e atribuir permissões diferentes.                                    |
|                    Passos                    | - Acessar com conta admin <br> - Cadastrar novo usuário <br> - Definir nível de acesso <br> - Efetuar login com novo usuário <br> - Verificar permissões |
|               Critério de êxito              |                                          - Cada tipo de usuário tem acesso apenas às funcionalidades permitidas.                                         |
| Responsável pela elaboração do caso de teste |                                                                      Danilo Lopes                                                                      |

|               **Caso de teste**              |                                             **CT-008 – Registro limitado por acesso**                                             |
| :------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |          RF-008 – Permitir que funcionários registrem movimentações de estoque sem acesso a configurações administrativas         |
|               Objetivo do teste              |                        Verificar se usuários com acesso restrito conseguem apenas registrar movimentações.                        |
|                    Passos                    | - Acessar com perfil de funcionário <br> - Registrar entrada/saída de insumos <br> - Tentar acessar configurações administrativas |
|               Critério de êxito              |                                       - Movimentações permitidas; configurações bloqueadas.                                       |
| Responsável pela elaboração do caso de teste |                                                           Danilo Lopes                                                          |

|               **Caso de teste**              |                                         **CT-009 – Notificações de estoque baixo**                                         |
| :------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                            RF-009 – Enviar notificações sobre estoque baixo e produtos vencendo                            |
|               Objetivo do teste              |                       Garantir que o sistema emita alertas quando o estoque estiver abaixo do mínimo.                      |
|                    Passos                    | - Reduzir a quantidade de um insumo abaixo do limite <br> - Aguardar processamento do sistema <br> - Verificar notificação |
|               Critério de êxito              |                                             - Alerta é exibido automaticamente.                                            |
| Responsável pela elaboração do caso de teste |                                                         Danilo Lopes                                                         |

|               **Caso de teste**              |                                          **CT-010 – Monitoramento em tempo real**                                         |
| :------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                            RF-010 – Monitorar em tempo real a quantidade de insumos disponíveis                           |
|               Objetivo do teste              |                                Testar se os dados do estoque são atualizados em tempo real.                               |
|                    Passos                    | - Acessar dashboard de estoque <br> - Registrar movimentação em outro dispositivo <br> - Verificar atualização automática |
|               Critério de êxito              |                              - Quantidade se atualiza sem necessidade de recarregar a página.                             |
| Responsável pela elaboração do caso de teste |                                                         Danilo Lopes                                                        |

|               **Caso de teste**              |                                 **CT-011 – Relatório de desperdício**                                 |
| :------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
|              Requisito associado             |             RF-011 – Fornecer relatórios sobre o desperdício de insumos ao longo do tempo             |
|               Objetivo do teste              |                       Verificar a geração correta de relatórios de desperdício.                       |
|                    Passos                    | - Registrar perdas de insumos <br> - Acessar relatórios de desperdício <br> - Analisar dados exibidos |
|               Critério de êxito              |                     - Relatório apresenta perdas corretamente por período e tipo.                     |
| Responsável pela elaboração do caso de teste |                                               Danilo Lopes                                              |

|               **Caso de teste**              |                                  **CT-012 – Alerta de despesas fora do padrão**                                 |
| :------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                       RF-012 – Emitir alertas sobre despesas excessivas ou fora do padrão                       |
|               Objetivo do teste              |                      Testar se o sistema detecta e alerta automaticamente valores atípicos.                     |
|                    Passos                    | - Inserir despesas regulares <br> - Inserir uma despesa fora do padrão <br> - Verificar se o alerta foi exibido |
|               Critério de êxito              |                         - O sistema alerta automaticamente sobre valores fora do padrão.                        |
| Responsável pela elaboração do caso de teste |                                                  Danilo Lopes                                                |

|               **Caso de teste**              |                            **CT-013 – Definir metas financeiras**                           |
| :------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|              Requisito associado             |        RF-013 – Permitir a definição de metas financeiras para controle do orçamento        |
|               Objetivo do teste              |         Validar se o sistema permite cadastrar metas de receita, despesa e economia.        |
|                    Passos                    | - Acessar módulo financeiro <br> - Inserir metas mensais <br> - Verificar projeções geradas |
|               Critério de êxito              |                         - Metas salvas e refletidas nos relatórios.                         |
| Responsável pela elaboração do caso de teste |                                        Danilo Lopes                                       |

|               **Caso de teste**              |                                         **CT-014 – Indicadores ambientais**                                         |
| :------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |                   RF-014 – Fornecer métricas e indicadores sobre o impacto ambiental da sorveteria                  |
|               Objetivo do teste              |                          Verificar a exibição de indicadores ambientais com base nos dados.                         |
|                    Passos                    | - Inserir dados ambientais (ex: economia de energia) <br> - Acessar indicadores ambientais <br> - Analisar gráficos |
|               Critério de êxito              |                                         - Indicadores exibidos corretamente.                                        |
| Responsável pela elaboração do caso de teste |                                                      Danilo Lopes                                                      |

|               **Caso de teste**              |                       **CT-015 – Cadastro de práticas sustentáveis**                       |
| :------------------------------------------: | :----------------------------------------------------------------------------------------: |
|              Requisito associado             |         RF-015 – Permitir o cadastro de práticas sustentáveis adotadas pela empresa        |
|               Objetivo do teste              |          Verificar se é possível cadastrar e visualizar boas práticas ambientais.          |
|                    Passos                    | - Acessar área de sustentabilidade <br> - Cadastrar nova prática <br> - Verificar listagem |
|               Critério de êxito              |                         - Prática exibida corretamente na listagem.                        |
| Responsável pela elaboração do caso de teste |                                         Danilo Lopes                                         |

|               **Caso de teste**              |                                        **CT-016 – Relatórios integrados**                                        |
| :------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: |
|              Requisito associado             |   RF-016 – Gerar relatórios periódicos sobre controle de estoque, desempenho financeiro e práticas sustentáveis  |
|               Objetivo do teste              |                          Verificar a geração correta de relatórios integrados por área.                          |
|                    Passos                    | - Acessar módulo de relatórios <br> - Selecionar "Relatório Geral" <br> - Definir período <br> - Gerar relatório |
|               Critério de êxito              |                       - Relatório apresenta dados de estoque, finanças e sustentabilidade.                       |
| Responsável pela elaboração do caso de teste |                                                    Danilo Lopes                                                   |


<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site https://adota-pet.herokuapp.com/src/index.html <br> - Clicar no botão "Entrar" <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login" |
| Critério de êxito | - O login foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |


## Ferramentas de testes (opcional)

As ferramentas utilizadas para a execução dos testes incluíram:

* Navegador Google Chrome (ambiente padrão de testes)
* Planilha de controle de testes (Google Sheets)
* Gravador de tela (para registro e validação dos resultados)
* Sistema de gerenciamento de tarefas (Trello) para rastrear os testes e bugs
