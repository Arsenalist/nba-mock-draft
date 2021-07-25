import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

interface DraftOrderProps {
  maxEntries?: number
}
export function DraftOrder(props: DraftOrderProps) {
  const [draftOrder, setDraftOrder] = useState([])

  useEffect(() => {
    axios.get('/api/draft-order').then(response => {
      if (props.maxEntries) {
        setDraftOrder(response.data.slice(0, Math.min(response.data.length, props.maxEntries)))
      } else {
        setDraftOrder(response.data)
      }
    });
  }, []);

  return <List>
    {draftOrder.map((draftOrderItem, index) => (
      <ListItem key={`item-${index}`}>
        <ListItemText key={`item-text-${index}`}
          secondary={`#${draftOrderItem["order"]}`} primary={`${draftOrderItem["team"]}`}
        />
      </ListItem>
    ))
    }
  </List>

}
