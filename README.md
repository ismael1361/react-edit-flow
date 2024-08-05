# react-edit-flow

O `react-edit-flow` é um módulo para React.js que fornece uma solução para desenvolvimento visual baseado em *no-code* e *low-code*. Este módulo facilita a criação e manipulação de fluxos de trabalho por meio de uma interface intuitiva e gráfica, permitindo a construção e gestão de processos de forma eficiente e sem a necessidade de codificação extensiva.

![Exemplo de fluxo de trabalho](resources/image-001.png)

O desenvolvimento do `react-edit-flow` foi motivado pela necessidade de otimizar a criação de endpoints em projetos como [IVIPBASE](https://www.npmjs.com/package/ivipbase) e [only-api](https://www.npmjs.com/package/only-api). O módulo visa proporcionar uma abordagem visual para o design de endpoints, alinhada com metodologias *no-code* e *low-code*, permitindo uma integração simplificada e eficaz no fluxo de desenvolvimento.

## Índice   
- [react-edit-flow](#react-edit-flow)
  - [Índice](#índice)
  - [Instalação](#instalação)
  - [Utilização](#utilização)
- [Referências](#referências)

## Instalação

Para instalar o `react-edit-flow`, execute o seguinte comando:

```bash
npm install react-edit-flow
```

## Utilização

Para utilizar o `react-edit-flow`, importe o módulo e adicione o componente `ReactFlowUI` ao seu projeto. O componente `ReactFlowUI` aceita uma propriedade `flow` que define o fluxo de trabalho a ser exibido. O fluxo de trabalho é representado por um array de objetos JSON que define os passos e conexões do processo.

```tsx
import React from 'react';
import ReactFlowUI from 'react-edit-flow';

const flow = [
	{ name: "start", id: "0aceb982-dcfb-47e5-a4eb-8461cf5e2bba", children: [], values: {} },
	{
		name: "variable-initialize",
		id: "dfdbeee4-7f55-425b-bb14-01e7aaf5d302",
		children: [],
		values: {
			variable: { name: "variable01", definition: "var", value: "Hello World!", expressionType: "string" },
		},
	},
	{ name: "end", id: "53fedef2-75ee-4ccf-93a8-fc5c9da11880", children: [], values: {} },
];

const App = () => {
    return (
        <ReactFlowUI flow={flow} />
    );
};

export default App;
```


# Referências
https://bytedance.github.io/flow-builder/#/
https://www.npmjs.com/package/react-flow-builder
https://dribbble.com/shots/21751479-Drag-and-Drop-Steps-in-Journeys
https://powerusers.microsoft.com/t5/image/serverpage/image-id/827990i9D251D7D4846F2F0?v=v2
https://learn.microsoft.com/en-us/power-automate/desktop-flows/media/monitoring/monitor-desktop-flow-queues-1.png

https://www.crmheidi.com/index.php/2022/09/07/a-guide-to-power-automates-14-built-in-connectors-actions/
https://learn.microsoft.com/en-us/power-automate/date-time-values
https://learn.microsoft.com/en-us/power-automate/create-variable-store-values?tabs=classic-designer