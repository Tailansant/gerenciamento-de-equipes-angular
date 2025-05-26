# Gerenciamento de Equipes - Aplicação Angular

---

## Descrição do Projeto

Este é um sistema de gerenciamento de equipes desenvolvido em Angular 17, utilizando NgRx para gerenciamento de estado. A aplicação foi projetada para demonstrar uma arquitetura modular e boas práticas de desenvolvimento, com foco em usabilidade e design responsivo.

### Requisitos Funcionais Implementados:

* **RF01: Gerenciamento de Empresas (Administrador):** Permite que usuários com o papel de `Administrador` realizem operações de CRUD (Create, Read, Update, Delete) para o cadastro de `Empresas`.
* **RF02: Gerenciamento de Projetistas (Empresa):** Permite que usuários com o papel de `Empresa` realizem operações de CRUD para o cadastro de `Projetistas`. Cada projetista é associado à empresa que o cadastrou.
* **RF03: Gerenciamento de Equipes (Empresa):** Permite que usuários com o papel de `Empresa` realizem operações de CRUD para a criação e gestão de `Equipes`, compostas por usuários `Projetistas`.

---

## Critérios de Avaliação Atendidos

1.  **Clareza, Organização e Documentação:**
    * Estrutura de pastas lógica e modular.
    * Nomenclatura de arquivos e variáveis consistente.
    * Uso de padrões NgRx claros (Actions, Effects, Reducers, Selectors, States).
    * (Opcional, mas recomendado: Adicionar comentários relevantes no código.)

2.  **Arquitetura Bem Definida:**
    * Divisão em módulos de feature (`AuthModule`, `AdminModule`, `CompanyModule`, `BoardModule`, `SharedModule`).
    * `CoreModule` para serviços singleton, interceptors e guardas.
    * Gerenciamento de estado centralizado com NgRx.
    * Serviços dedicados para interação com a API REST.

3.  **Exemplos de Componentes Angular:**
    * Componentes de página dedicados para cada funcionalidade (ex: `CompaniesListPageComponent`, `DesignersListPageComponent`).
    * Utilização de `SharedModule` para componentes reutilizáveis, promovendo o encapsulamento.

4.  **Exemplos de Diretivas Angular:**
    * Uso de diretivas estruturais (`*ngIf`, `*ngFor`) para renderização condicional e iteração de listas.
    * Uso de diretivas de atributo (ex: `[ngClass]`, `[ngStyle]`) para estilização dinâmica.
    * Componentes do Angular Material que, por sua natureza, utilizam e exemplificam diretivas de atributo.

5.  **Interface Clean e Moderna:**
    * Implementação de design responsivo.
    * Utilização do Angular Material para componentes UI modernos e acessíveis.
    * Foco na usabilidade através de fluxos de navegação claros e feedback visual (notificações, estados de carregamento).

---

## Tecnologias Utilizadas

* **Angular 17:** Framework principal para o desenvolvimento da aplicação.
* **NgRx (Store, Effects, Selectors, Reducers):** Para gerenciamento de estado reativo e centralizado.
* **Angular Material:** Biblioteca de componentes UI para um design clean e responsivo.
* **RxJS:** Para programação reativa e manipulação de fluxos de dados.
* **TypeScript:** Linguagem de programação.
* **HTML5 / CSS3 (SCSS):** Para estruturação e estilização da interface.

---

## Instalação e Execução da Aplicação

Certifique-se de ter o Node.js (versão 18.x ou superior) e o Angular CLI instalados globalmente em sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Tailansant/gerenciamento-equipes-angular.git
    cd project-management-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute a aplicação:**
    ```bash
    ng serve
    ```
    A aplicação estará disponível em `http://localhost:4200/`.

---

## Estrutura do Projeto (Simplificada)

E:.
├───app
│   ├───admin             # Módulo para funcionalidades de Administrador (CRUD de Empresas)
│   ├───company           # Módulo para funcionalidades de Empresa (CRUD de Projetistas e Equipes)
│   ├───core              # Módulo para serviços, modelos, guards e interceptors globais
│   │   ├───enums
│   │   ├───guards
│   │   ├───models        # Definições de modelos (User, Company, Designer, Team, etc.)
│   │   └───services      # Serviços para comunicação com a API (RestApiService)
│   ├───auth              # Módulo de Autenticação (Login, Cadastro)
│   ├───board             # Módulo existente para funcionalidades de Boards/Tasks (se aplicável)
│   ├───shared            # Módulo para componentes Angular reutilizáveis
│   └───store             # Gerenciamento de estado global com NgRx
│       ├───actions
│       ├───effects
│       ├───reducers
│       ├───selectors
│       └───states
├───environments          # Configurações de ambiente
└───e2e                   # Testes End-to-End (se implementa
