import { globalStyle, style } from '@vanilla-extract/css';

export const kanbanItem = style({
  padding: 5
});

export const card = style({});

globalStyle(`${card} .ant-card-body`, {
  padding: '8px 16px'
});

export const actionButton = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const actionText = style({
  maxWidth: 0,
  marginRight: '-8px',
  opacity: 0,
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',

  selectors: {
    [`${actionButton}:hover &`]: {
      maxWidth: 100,
      marginRight: '5px',
      marginLeft: 8,
      opacity: 1,
      display: 'inline',
    },
  },
});