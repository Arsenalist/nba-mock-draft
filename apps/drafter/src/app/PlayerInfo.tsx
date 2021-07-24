import React, { useEffect, useState } from 'react';
import { Player } from '@raptors/api-interfaces';
import { ListItem, ListItemText } from '@material-ui/core';

interface PlayerInfoProps {
  player: Player
}

export function PlayerInfo(props: PlayerInfoProps) {
  const player = props.player

  return <>
      <ListItemText primary={player.name} secondary={`${player.height}, ${player.weight} lbs, ${player.school}, ${player.year}` }/>
    </>

}
