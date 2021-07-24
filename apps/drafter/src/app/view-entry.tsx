import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router'
import { Entry } from '@raptors/api-interfaces';
import axios from 'axios';
import { Box, List, ListItem } from '@material-ui/core';
import { DraftOrder } from './draft-order';
import { PlayerInfo } from './PlayerInfo';

export function ViewEntry() {
  const { id } = useParams<{id: string}>();
  const [entry, setEntry] = useState<Entry>()

  useEffect(() => {
    axios.get(`/api/entry/${id}`).then(response => setEntry(response.data));
  }, []);

  return <>
    <Box display="flex" flexDirection="row">
      <Box>
        <DraftOrder/>
      </Box>
      <Box>
        <List>
        {entry && entry.players.map((player) =>
          <ListItem>
            <PlayerInfo player={player}/>
          </ListItem>
        )}
        </List>
      </Box>
    </Box>

  </>
}
