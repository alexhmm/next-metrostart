import { ReactNode, memo, useCallback, useState } from 'react';
import { PopoverOrigin, SxProps, Theme, Tooltip } from '@mui/material';

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Types
import { ColorType, FontSize } from '../../types/mui.types';
import { MenuItem as IMenuItem } from '../../types/shared.types';

// UI
import IconButton from '../IconButton/IconButton';
import MenuPopover from './MenuPopover';

type IconMenuProps = {
  anchorOrigin?: PopoverOrigin;
  className?: string;
  color?: ColorType;
  icon?: ReactNode;
  iconSize?: FontSize;
  id?: string;
  items: IMenuItem[];
  padding?: string | undefined;
  sx?: SxProps<Theme>;
  tooltip?: string;
  transformOrigin?: PopoverOrigin;
  onAction: (action: any) => void;
};

const IconMenu = (props: IconMenuProps) => {
  // Component state
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  /**
   * Handler on menu click.
   */
  const onClick = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorMenu(event.currentTarget);
  }, []);

  /**
   * Handler to close menu.
   */
  const onClose = useCallback(() => {
    setAnchorMenu(null);
  }, []);

  return (
    <>
      <Tooltip placement="top" title={props.tooltip}>
        <IconButton
          className={props.className && props.className}
          color={props.color}
          icon={props.icon ?? <MoreVertIcon />}
          iconSize={props.iconSize}
          id={props.id}
          onClick={onClick}
        />
      </Tooltip>
      <MenuPopover
        anchorMenu={anchorMenu}
        items={props.items}
        onAction={props.onAction}
        onClose={onClose}
      />
    </>
  );
};

export default memo(IconMenu);
