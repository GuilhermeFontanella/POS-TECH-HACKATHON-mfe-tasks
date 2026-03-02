import { Collapse, type CollapseProps } from 'antd';
import * as styles from './SettingsList.css';
import Options from './options/Options';

const radioOptions = {
  title: 'Nível de complexidade da interface',
  subtitle: 'Escolha o nível de complexidade da interface',
  options: [
    { value: 1, label: 'Básico', complementaryText: 'Mostra somente as informações mais importantes. Ideal para quem prefere uma tela mais simples, com menos elementos e menos distrações.' },
    { value: 2, label: 'Comum', complementaryText: 'Mostra as informações essenciais para o uso diário do sistema. É um equilíbrio entre simplicidade e recursos disponíveis.' },
    { value: 3, label: 'Completo', complementaryText: 'Mostra todas as informações e funcionalidades disponíveis. Indicado para quem já está familiarizado com o sistema e deseja acessar todos os recursos.' },
  ]
}

const focusMode = {
  title: 'Modo foco',
  subtitle: `
    O Modo Foco ajuda você a manter a concentração em uma tarefa por um período determinado de tempo. Quando ativado:
    As notificações são temporariamente desativadas.
    Alertas visuais e sonoros são reduzidos.
    Um contador de tempo é iniciado para organizar seu período de concentração.
    Esse modo pode ser utilizado com a técnica Pomodoro, que divide o tempo em blocos de foco (por exemplo, 25 minutos) seguidos de pequenas pausas.
    Ao final do tempo escolhido, as notificações são reativadas automaticamente.
    Você pode ativar ou desativar o Modo Foco sempre que desejar.
  `,
  options: [
    { value: 1, label: 'Ligado' },
  ]
}

const alertMode = {
  title: 'Alerta cognitivo',
  subtitle: `
    O Alerta Cognitivo ajuda você a perceber quando está há muito tempo na mesma tarefa.
    Quando ativado:
    O sistema acompanha o tempo que você permanece em uma atividade.
    Após um período prolongado, um aviso gentil é exibido.
    O alerta pode sugerir uma pausa ou a troca de tarefa.
    Esse recurso é útil para evitar cansaço mental e sobrecarga, ajudando você a manter um ritmo mais saudável de trabalho ou estudo.
    Você pode ativar ou desativar essa opção a qualquer momento.
  `,
  options: [
    { value: 1, label: 'Ligado' },
  ]
}

const summaryMode = {
  title: 'Modo resumo / Modo detalhado',
  subtitle: `
    Você pode escolher como deseja visualizar as informações na tela.
    Modo Resumo
    Exibe as informações principais de forma simplificada e direta.
    Ideal para quem prefere uma visualização mais limpa, com menos detalhes e menos distrações.
    Modo Detalhado
    Exibe todas as informações disponíveis, incluindo dados complementares e explicações adicionais.
    Indicado para quem deseja uma análise mais completa do conteúdo.
    Você pode alterar o modo de visualização a qualquer momento.
  `,
  options: [
    { value: 1, label: 'Modo resumo' },
    { value: 2, label: 'Modo detalhado' },
  ],
  multiple: false
}

const inputNumber = {
  title: 'Espaçamento entre os elementos',
  subtitle: `
    Você pode ajustar o espaço entre textos, botões e outros elementos da tela.
    Aumentar o espaçamento pode:
    Facilitar a leitura
    Reduzir a sensação de tela “apertada”
    Melhorar a organização visual
    Diminuir o cansaço ao usar o sistema
    Você pode escolher o nível de espaçamento que for mais confortável para você.
    A alteração é aplicada automaticamente na interface.
  `,
  options: [
    { value: 1, label: 'Modo resumo' },
  ],
  multiple: false
}

const inputNumberTextSize = {
  title: 'Tamanho da fonte',
  subtitle: `
    Você pode ajustar o tamanho do texto exibido na tela.
    Aumentar o texto pode:
    Facilitar a leitura
    Reduzir o esforço visual
    Melhorar a compreensão do conteúdo
    Tornar a navegação mais confortável
    As alterações são aplicadas automaticamente e você pode modificar essa opção sempre que precisar.
  `,
  options: [
    { value: 1, label: 'Modo resumo' },
  ],
  multiple: false
}

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Nível de complexidade da interface',
    children: <Options optionType='radio' data={radioOptions} />,
  },
  {
    key: '2',
    label: 'Modo resumo / Modo detalhado',
    children: <Options optionType='switch' data={summaryMode} onChangeValue={(value) => console.log(value)} />,
  },
  {
    key: '3',
    label: 'Espaçamento entre os elementos',
    children: <Options optionType='inputNumber' data={inputNumber} onChangeValue={(value) => console.log(value)} />,
  },
  {
    key: '4',
    label: 'Tamanho da fonte',
    children: <Options optionType='inputNumber' data={inputNumberTextSize} onChangeValue={(value) => console.log(value)} />,
  },
  {
    key: '5',
    label: 'Alerta cognitivo',
    children: <Options optionType='switch' data={alertMode} onChangeValue={(value) => console.log(value)} />,
  },
  {
    key: '6',
    label: 'Modo foco',
    children: <Options optionType='switch' data={focusMode} onChangeValue={(value) => console.log(value)} />,
  },
];

const SettingsList = () => {
    return (
      <div className={styles.list}>
          <Collapse style={{width: '100%'}} accordion items={items} />     
      </div>
    );
}

export default SettingsList;