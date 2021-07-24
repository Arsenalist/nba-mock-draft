import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Team } from '@raptors/api-interfaces';
import { Box, List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

export function DraftOrder() {
  const [draftOrder, setDraftOrder] = useState([])

  useEffect(() => {
    axios.get('/api/draft-order').then(response => setDraftOrder(response.data));
  }, []);

  return <List>
    {draftOrder.map((draftOrderItem) => (
      <ListItem>
        <ListItemText
          secondary={`#${draftOrderItem["order"]}`} primary={`${draftOrderItem["team"]}`}
        />
      </ListItem>
    ))
    }
  </List>

}
