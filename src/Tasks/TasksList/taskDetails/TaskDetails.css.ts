import { style } from '@vanilla-extract/css';

export const actionButton = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const actionText = style({
  maxWidth: 0,
  marginRight: '-8px',
  opacity: 0,
  transition: 'all 0.5s ease',
  whiteSpace: 'nowrap',

  selectors: {
    [`${actionButton}:hover &`]: {
      maxWidth: 'fit-content',
      marginRight: '5px',
      marginLeft: 8,
      opacity: 1,
      display: 'inline',
    },
  },
});