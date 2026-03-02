import * as styles from './TasksList.css';
import { Puck, type Config } from '@puckeditor/core';
import { useState } from 'react';
const initialData = {
  content: [
    {
      type: "Board",
      props: {
        columns: [
          {
            type: "Column",
            props: {
              title: "To Do",
              items: [
                { type: "Card", props: { text: "Task 1" } },
              ],
            },
          },
          {
            type: "Column",
            props: {
              title: "Doing",
              items: [],
            },
          },
          {
            type: "Column",
            props: {
              title: "Done",
              items: [],
            },
          },
        ],
      },
    },
  ],
};

const SettingsList = () => {
  const [data, setData] = useState(initialData);

  const config: Config = {
    components: {
      Board: {
        fields: {
          columns: {
            type: "slot",
          },
        },
        render: ({ columns: Columns }) => (
          <div style={{ display: "flex", gap: 16 }}>
            <Columns />
          </div>
        ),
      },

      Column: {
        fields: {
          title: { type: "text" },
          items: { type: "slot" },
        },
        render: ({ title, items: Items }) => (
          <div style={{ width: 300, background: "#f5f5f5", padding: 12 }}>
            <h3>{title}</h3>
            <Items />
          </div>
        ),
      },

      Card: {
        fields: {
          text: { type: "text" },
        },
        render: ({ text }) => (
          <div style={{ background: "white", padding: 8, marginBottom: 8 }}>
            {text}
          </div>
        ),
      },
    },
  };

  return (
    <div className={styles.list}>
      <Puck
        config={config}
        data={data}
        onChange={(newData) => setData(newData)}
      />
    </div>
  );
}

export default SettingsList;