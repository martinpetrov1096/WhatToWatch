import { color } from '../../styles/global';
import * as Type from '../../styles/components/lobby/type';
import Switch from 'react-switch';

const TypeSwitchParams = {
      checkedIcon: false,
      uncheckedIcon: false,
      offColor: color.primaryDark,
      onColor: color.primaryDark,
      offHandleColor: color.secondary,
      onHandleColor: color.secondary,
      height: 22,
      handleDiameter: 26
}

interface LobbyTypeProps {
   type: 'tv' | 'movie';
   setType: (t: 'tv' | 'movie') => void;
}

export const LobbyType = (props: LobbyTypeProps) => {

   return (
      <Type.Wrapper>
         <Type.Category>MOVIE</Type.Category>
         <Switch checked={props.type==='tv'} onChange={(checked) => checked ? props.setType('tv') : props.setType('movie')} {...TypeSwitchParams}/>
         <Type.Category>TV SHOW</Type.Category>
      </Type.Wrapper>
   );
}