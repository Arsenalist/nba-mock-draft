import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button, ButtonGroup, IconButton,
  List, ListItem,
  TextField
} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Player } from '@raptors/api-interfaces';
import { DraftOrder } from './draft-order';
import { PlayerInfo } from './PlayerInfo';
import { ArrowDropUp } from '@material-ui/icons';
import { ArrowDropDown } from '@material-ui/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { TwitterIcon, TwitterShareButton } from 'react-share';

export function Main() {

  const [players, setPlayers] = useState<Player[]>([])
  const [hash, setHash] = useState("")
  const [copied, setCopied] = useState(false)

  const baseUrl = () => {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;
    return `${protocol}://${domain}${port ? `:${port}` : ''}`;
  }

  useEffect(() => {
    axios.get('/api/players').then(response => setPlayers(response.data));
  }, []);

  const save = (players: Player[]) => {
    axios.post('/api/save', players).then(response => {
      setHash(`${baseUrl()}/e/${response.data.hash}`)
    });
  }

  const saveLottery = () => {
    save(Array.from(players).slice(0, 14))
  }

  const saveFirstRound = () => {
    save(Array.from(players).slice(0, 30))
  }

  const saveAll = () => {
    save(players)
  }

  const moveUp = (e: any) => {
    const index = parseInt(e.target.getAttribute('data-index'))
    console.log("moveUp: index is ", index)
    const items = reorder(players, index, index-1);
    setPlayers(items)
  }
  const moveDown = (e: any) => {
    const index = parseInt(e.target.getAttribute('data-index'))
    console.log("moveDown: index is ", index)
    const items = reorder(players, index, index+1);
    setPlayers(items)
  }

  const onDragEnd = (result: any) => {
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
    console.log("in reorder: ", startIndex, endIndex)
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  return (
    <>
      <Box display="flex" flexDirection="column" p={1} m={1} >
        <Box p={1}>
          <p>
            Drag and drop the players or use the arrows provided. Then hit save.
          </p>
          <ButtonGroup variant="outlined" color="primary" aria-label="contained primary button group">
            <Button  onClick={saveLottery}>Save Lottery</Button>
            <Button   onClick={saveFirstRound}>Save First Round</Button>
            <Button  onClick={saveAll}>Save All</Button>
          </ButtonGroup>
        </Box>
        {hash &&<Box p={1}>
          <TextField
            onFocus={(event) => event.target.select()}
            value={hash}
            id="standard-read-only-input"
            label="Shareable Link"
            InputProps={{
              readOnly: true,
            }}
            />
        </Box>}

        {hash && <Box p={1}>
          <CopyToClipboard text={hash} onCopy={() => setCopied(true)}>
            <a href="#">Copy</a>
          </CopyToClipboard> {copied && <div>Copied to clipboard!</div>}
        </Box>}

        {hash && <Box p={1} alignItems={"center"}>
            <Box alignItems={"center"}>
              Share:
            </Box>
            <Box alignItems={"center"}>


              <TwitterShareButton
                url={hash}
                hashtags={["NBADraft"]}
                title="My mock draft">
                <TwitterIcon size={32} round  />
              </TwitterShareButton>


            </Box>
          </Box>}
      </Box>
        <Box display="flex" flexDirection="row" >
        <Box p={1}>
          <DraftOrder/>
        </Box>
        <Box p={1}>
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
                        <Draggable index={index} key={`draggable-${index}`} draggableId={`player-${index}`}>
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
