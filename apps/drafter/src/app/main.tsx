import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button, IconButton,
  List, ListItem,
  TextField
} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Player } from '@raptors/api-interfaces';
import { DraftOrder } from './draft-order';
import { PlayerInfo } from './PlayerInfo';
import { ArrowDropUp } from '@material-ui/icons';
import { ArrowDropDown } from '@material-ui/icons';

export function Main() {

  const [players, setPlayers] = useState<Player[]>([])

  const [hash, setHash] = useState("")

  const baseUrl = () => {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;
    return `${protocol}://${domain}${port ? `:${port}` : ''}`;
  }

  useEffect(() => {
    axios.get('/api/players').then(response => setPlayers(response.data));
  }, []);

  const save = () => {
    axios.post('/api/save', players).then(response => {
      setHash(`${baseUrl()}/entry/${response.data.hash}`)
    });
  }

  const moveUp = (e: any) => {
    const index: number = e.target.getAttribute('data-index')
    const items = reorder(players, index, index-1);
    setPlayers(items)
  }
  const moveDown = (e: any) => {
    const index = e.target.getAttribute('data-index')
    const items = reorder(players, index, index+1);
    setPlayers(items)
  }

  const onDragEnd = (result: any) => {
    console.log(result)
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      players,
      result.source.index,
      result.destination.index
    );
    setPlayers(items)
  }

  const reorder = (list: Player[], startIndex: number, endIndex: number): Player[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  return (
    <>
      <Box display="flex" flexDirection="row" p={1} m={1} >
        <Box p={1}>
          <p>
            Drag and drop the players or use the arrows provided. Then hit save.
          </p>

          <Button variant="contained" color="primary" onClick={save}>Save</Button>
        </Box>
        <Box p={1}>
          {hash &&
            <TextField
              onFocus={(event) => event.target.select()}
              style={{width: '400px'}}
              value={hash}
              id="standard-read-only-input"
              label="Shareable Link"
              InputProps={{
                readOnly: true,
              }}
            />
          }
        </Box>
      </Box>

      <Box display="flex" flexDirection="row">
        <Box>
          <DraftOrder/>
        </Box>
        <Box>
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="players">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <List>
                      {players.map((player, index) => (
                        <Draggable index={index} key={player.id} draggableId={`player-${player.id}`}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <ListItem>
                                <PlayerInfo player={player}/>
                                <IconButton
                                  onClick={moveDown}
                                  aria-label="open drawer"
                                  edge="start"
                                >
                                  <ArrowDropDown data-index={index}/>
                                </IconButton>
                                <IconButton
                                  onClick={moveUp}
                                  aria-label="open drawer"
                                  edge="start"
                                >
                                  <ArrowDropUp data-index={index}/>
                                </IconButton>

                              </ListItem>
                            </div>
                          )}
                        </Draggable>
                      ))
                      }
                    </List>
                    {provided.placeholder}
                  </div>


                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Box>
      </Box>
    </>
  );
};

