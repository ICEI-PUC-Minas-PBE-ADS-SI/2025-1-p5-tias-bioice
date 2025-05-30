# Arquitetura da solução

![Arquitetura básica](./images/arquitetura-basica.png)


## Diagrama de classes

![classes drawio(1)](https://github.com/user-attachments/assets/4672070a-9731-42a7-8473-3df335734437)


##  Modelo de dados

### Modelo ER

![der_Chen drawio](https://github.com/user-attachments/assets/219c2bc5-91f2-4349-888d-1e6a934583ee)


### Esquema relacional

![der_def drawio(3)](https://github.com/user-attachments/assets/54f6efe2-9b5e-42fd-89ef-03b250889ed8)


---



### Modelo físico

```SQL
-- Tabela de fornecedor
CREATE TABLE tb_fornecedor (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nm_fornecedor VARCHAR(255) NOT NULL,
    dt_criado_em DATE NOT NULL,
    dt_atualizado_em DATE NOT NULL
);

-- Tabela de domínio para o tipo de movimentação (entrada, saída...)
CREATE TABLE tb_tipo_movimentacao (
    id_tipo_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    nm_tipo_movimentacao VARCHAR(255) NOT NULL,
    dt_criado_em DATE NOT NULL,
    dt_atualizado_em DATE NOT NULL
);

-- Tabela para registrar movimentações de produtos
CREATE TABLE tb_movimentacao_produto (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    fk_produto INT NOT NULL,
    fk_tipo_movimentacao INT NOT NULL,
    nu_preco DECIMAL(15,2) NOT NULL,
    nu_quantidade INT NOT NULL,
    fk_fornecedor INT, -- Nullable
    dt_criado_em DATE NOT NULL,
    dt_atualizado_em DATE NOT NULL,
    FOREIGN KEY (fk_produto) REFERENCES tb_produto(id_insumo),
    FOREIGN KEY (fk_tipo_movimentacao) REFERENCES tb_tipo_movimentacao(id_tipo_movimentacao),
    FOREIGN KEY (fk_fornecedor) REFERENCES tb_fornecedor(id_fornecedor)
);

-- Tabela de usuário
CREATE TABLE tb_usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nm_email VARCHAR(255) NOT NULL,
    ds_senha VARCHAR(50) NOT NULL,
    fk_role INT NOT NULL,
    FOREIGN KEY (fk_role) REFERENCES tb_fornecedor(id_role)
);

-- Tabela para definir as permissões de cada usuário
CREATE TABLE tb_role (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    nm_role VARCHAR(255) NOT NULL
);

-- Tabela para registrar e editar o dia do cronograma da coleta.
CREATE TABLE tb_cronograma_coleta (
    id_cronograma_coleta INT AUTO_INCREMENT PRIMARY KEY,
    nm_dia_coleta VARCHAR(13) NOT NULL,
    dt_criado_em DATE NOT NULL,
    dt_atualizado_em DATE NOT NULL
);
```


## Tecnologias

Para o desenvolvimento do software de gestão sustentável da sorveteria Ice Delícias, será utilizada uma combinação de tecnologias modernas e eficientes que permitem a criação de aplicações web responsivas, escaláveis e de fácil manutenção. A seguir, estão listadas todas as tecnologias envolvidas:

### Linguagens de Programação e Marcação

- HTML: Estruturação semântica das páginas web.
-CSS3: Estilização e responsividade da interface do usuário.
- JavaScript: Lógica de interatividade do lado do cliente.
- TypeScript: Superset do JavaScript, utilizado para tornar o código mais robusto e escalável.
- Frameworks e Bibliotecas
- React/Vue: Bibliotecas/frameworks JavaScript para construção de interfaces de usuário dinâmicas e reativas, possibilitando desenvolvimento modular e reutilizável.
- Node.js: Ambiente de execução JavaScript no lado do servidor.
- Express.js: Framework minimalista do Node.js utilizado para criar APIs RESTful.

### Banco de Dados

- MySQL: Para armazenar dados sobre estoque, validade de insumos e controle financeiro de forma segura e eficiente.

### Ferramentas de Desenvolvimento
- Visual Studio Code (VS Code): IDE leve e eficiente com suporte a extensões que facilitam o desenvolvimento com as tecnologias utilizadas.
- Git e GitHub: Controle de versão e colaboração entre os membros da equipe.
- Rider: Editor de C# com suporte a Web e bancos de dados, otimizado para ASP.NET Core e clássico desenvolvido pela JetBrains.
- WebStorm: IDE focada no desenvolvimento de aplicações Web, especialmente em JavaScript e TypeScript desenvolvido pela JetBrains.
- Figma: Utilizado para o protótipo de telas e planejamento de interface do usuário (UI/UX).

### Interação entre as tecnologias

![arquitetura da solução](./images/arquitetura-software.png)



| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | Next.js (React) |
| Back-end       | Nest.js (Node)  |
| SGBD           | MySQL           |
| Deploy         | Vercel (Front-end)         |
| Protótipos | Figma |
| IDE | Visual Studio Code, WebStorm, Rider |

## Hospedagem

A hospedagem e o lançamento da plataforma Ice Delícias serão realizados utilizando a Vercel, uma plataforma moderna e eficiente voltada para o deploy de aplicações web. A escolha da Vercel se deu por sua integração nativa com o Next.js, facilidade de configuração, deploy contínuo via GitHub e por utilizar a infraestrutura da AWS, o que garante alta performance, escalabilidade e segurança.

O processo de hospedagem seguirá os seguintes passos:

- O código-fonte será versionado e mantido em um repositório no GitHub.

- A Vercel será conectada diretamente ao repositório, permitindo deploys automáticos a cada nova atualização.

- A aplicação será configurada com um domínio personalizado, com gerenciamento automático de certificados SSL pela própria plataforma.

- A integração com o Next.js permitirá o uso de rotas dinâmicas, renderização híbrida e otimização automática da aplicação.

Durante o desenvolvimento, ferramentas como o Repl.it foram utilizadas para testes rápidos e colaboração entre os desenvolvedores. Alternativas como GitHub Pages e Heroku chegaram a ser avaliadas, mas a equipe optou pela Vercel devido à sua compatibilidade com o stack adotado e simplicidade no processo de publicação.



## Qualidade de software

A qualidade de software será um dos pilares fundamentais no desenvolvimento da plataforma **Ice Delícias**. Para garantir que o sistema atenda às necessidades dos usuários e dos gestores da sorveteria, adotaremos como referência o modelo de qualidade definido pela norma internacional **ISO/IEC 25010:2011**.

Essa norma define oito características principais de qualidade, que se desdobram em diversas subcaracterísticas. Com base nas necessidades do projeto e no perfil dos usuários, nossa equipe selecionou as seguintes subcaracterísticas como foco de atenção durante o desenvolvimento:

### Subcaracterísticas Selecionadas

---

###  Usabilidade *(Operacionalidade, Acessibilidade, Inteligibilidade)*

**Justificativa:**  
O sistema será utilizado por pessoas com diferentes níveis de familiaridade com tecnologia. Portanto, ele precisa ser intuitivo, fácil de usar e acessível.

**Métricas:**
- Tempo médio para completar uma tarefa comum no sistema (ex: registrar um item no estoque).
- Número de cliques necessários para acessar funcionalidades principais.
- Avaliação de usabilidade por meio de testes com usuários.

---

###  Confiabilidade *(Maturidade, Tolerância a Falhas)*

**Justificativa:**  
O sistema precisa funcionar corretamente na maior parte do tempo, mesmo em situações inesperadas.

**Métricas:**
- Taxa de falhas durante o uso (bugs reportados por semana).
- Porcentagem de disponibilidade do sistema (uptime).
- Resultados de testes automatizados.

---

###  Segurança *(Confidencialidade, Integridade, Autenticidade)*

**Justificativa:**  
Como o sistema lidará com dados financeiros e de estoque, é essencial garantir que informações não sejam acessadas ou alteradas por pessoas não autorizadas.

**Métricas:**
- Número de vulnerabilidades encontradas em testes de segurança.
- Validação de autenticação e autorização por meio de testes.
- Uso de conexões criptografadas (HTTPS).

---

###  Manutenibilidade *(Modificabilidade, Testabilidade)*

**Justificativa:**  
O sistema deve ser fácil de atualizar e corrigir, facilitando sua evolução ao longo do tempo.

**Métricas:**
- Cobertura de testes automatizados (% de código testado).
- Tempo médio para corrigir um bug identificado.
- Número de arquivos ou módulos afetados por cada alteração.
