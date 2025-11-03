# Documentação do Fluxo de Veterinário

Este documento detalha a arquitetura, fluxo de navegação e componentes principais relacionados à funcionalidade de veterinário no aplicativo.

## Visão Geral

O fluxo de veterinário está integrado ao aplicativo principal do usuário através do `UserTabNavigator`. As telas permitem que os usuários agendem e visualizem consultas, enquanto os veterinários gerenciam seus compromissos.

## Arquivos Chave

| Arquivo | Localização | Propósito |
| --- | --- | --- |
| `VeterinarianMainApp.jsx` | `src/navigation/` | Wrapper que atualmente renderiza `UserTabNavigator`. |
| `UserTabNavigator.jsx` | `src/navigation/` | Define a navegação principal com abas (Bottom Tab Navigator), incluindo as stacks de navegação para cada aba. |
| `VeteScreen.jsx` | `src/screens/` | Tela principal para visualização de consultas, segmentada por status (Agendada, Em Andamento, Concluídas). |
| `VeteSelectScreen.jsx` | `src/screens/` | Tela para seleção de veterinário durante o processo de agendamento. |
| `Theme.js` | `src/styles/` | Contém os tokens de design, como cores (`Colors`) e estilos reutilizáveis (`CommonStyles`). |

## Fluxo de Navegação

O fluxo de agendamento de uma consulta com um veterinário segue os seguintes passos:

1.  **Agenda**: O usuário inicia o fluxo a partir da aba "Agenda".
2.  **Agendamento**: O usuário preenche as informações iniciais do agendamento em `ScheduleFormScreen.jsx`.
3.  **Seleção do Veterinário**: O usuário é navegado para `VeteSelectScreen.jsx` para escolher um veterinário.
4.  **Revisão**: Após selecionar um veterinário, o usuário revisa os detalhes do agendamento em `ReviewScreen.jsx`.
5.  **Sucesso**: Após a confirmação, a tela `SuccessScreen.jsx` é exibida.

A navegação é gerenciada pelo `UserTabNavigator.jsx`, que utiliza um `createBottomTabNavigator` e aninha `createStackNavigator` para cada aba.

### Stacks de Navegação

-   **AgendaUserTabStack**: Contém as telas `Agenda`, `Agendamento`, `ScheduleFormScreen`, `VeteSelectScreen`, `ReviewScreen`, e `SuccessScreen`.

## Componentes e Telas

### `VeteScreen.jsx`

-   **Objetivo**: Exibir a lista de consultas do usuário (ou veterinário), filtrada por status.
-   **Estrutura**:
    -   Utiliza abas internas para alternar entre "Agendada", "Andamento" e "Concluídas".
    -   Renderiza uma lista de cards de consulta (`<ConsultationCard />`).
    -   Cada card, ao ser tocado, navega para `DetalhesConsultaScreen.jsx`.
-   **Contrato de Dados (Consulta)**:
    ```json
    {
      "id": "number",
      "petName": "string",
      "service": "string",
      "time": "string",
      "imageSource": "require()",
      "status": "'Agendada' | 'Andamento' | 'Concluída'",
      "data": "string",
      "sintomas": "string",
      "localizacao": "string",
      "implementos": ["string"]
    }
    ```

### `VeteSelectScreen.jsx`

-   **Objetivo**: Permitir que o usuário selecione um veterinário para a consulta.
-   **Estrutura**:
    -   Exibe uma grade de veterinários (`<VetCard />`).
    -   O estado local `selectedVetId` rastreia o veterinário selecionado.
    -   O botão "Próximo" é ativado após a seleção e navega para `ReviewScreen.jsx`, passando os dados do agendamento e do veterinário.
-   **Contrato de Dados (Veterinário)**:
    ```json
    {
      "id": "string",
      "name": "string",
      "specialty": "string",
      "photo": "string (URL)",
      "rating": "number"
    }
    ```

## Recomendações e Próximos Passos

-   **Refatorar Estilos**: Substituir estilos inline por tokens do `Theme.js`.
-   **Componentes Reutilizáveis**: Criar e utilizar os componentes `<ConsultationCard />` e `<VetCard />`.
-   **Tratamento de Erros**: Implementar fallbacks para imagens e tratamento para listas vazias.
-   **Manipulação de Datas**: Utilizar uma biblioteca como `dayjs` para parsing e formatação de datas.
-   **Gerenciamento de Estado**: Mover dados de agendamento para um contexto (React Context) ou Redux para evitar a passagem excessiva de parâmetros de navegação.