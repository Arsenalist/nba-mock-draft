import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router'
import { Entry } from '@raptors/api-interfaces';
import axios from 'axios';
import { Box, List, ListItem } from '@material-ui/core';
import { DraftOrder } from './draft-order';
import { PlayerInfo } from './PlayerInfo';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';



export function ViewEntry() {
  const { id } = useParams<{id: string}>();
  const [entry, setEntry] = useState<Entry>()

  useEffect(() => {
    axios.get(`/api/entry/${id}`).then(response => setEntry(response.data));
  }, []);

  return <>
    <Helmet>
      <meta name="og:image" content="https://i.imgur.com/fmlXMxb.png" />
    </Helmet>
    <Box p={1} m={1}>
      <p>
        <Link to={'/'}>Make another mock draft.</Link>
      </p>
    </Box>

    <Box display="flex" flexDirection="row" p={1} m={1}>
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
