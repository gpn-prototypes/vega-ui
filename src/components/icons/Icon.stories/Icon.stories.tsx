import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  IconAdd,
  IconAlert,
  IconAlignBlocksLeft,
  IconAlignBlocksRight,
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArtBrush,
  IconAttach,
  IconBackward,
  IconBag,
  IconBarrier,
  IconBento,
  IconBold,
  IconBookmarkFilled,
  IconBookmarkStroked,
  IconCalendar,
  IconCamera,
  IconCancel,
  IconChat,
  IconCheck,
  IconClose,
  IconCollapse,
  IconColorFill,
  IconColorText,
  IconColumns,
  IconComment,
  IconConnection,
  IconCopy,
  IconCrown,
  IconCursorMouse,
  IconDiamond,
  IconDisconnection,
  IconDocAdd,
  IconDocBlank,
  IconDocDelete,
  IconDocFilled,
  IconDown,
  IconDownload,
  IconDrag,
  IconDrillingRig,
  IconDrop,
  IconEdit,
  IconExit,
  IconExpand,
  IconEye,
  IconEyeClose,
  IconFavorite,
  IconFilter,
  IconFlagFilled,
  IconFlagStroked,
  IconFolders,
  IconForward,
  IconFunnel,
  IconGas,
  IconGrouping,
  IconHamburger,
  IconHand,
  IconHealth,
  IconIntroduction,
  IconItalic,
  IconKebab,
  IconLayers,
  IconLeaf,
  IconLink,
  IconList,
  IconListNumbered,
  IconLock,
  IconMail,
  IconMaxHeight,
  IconMaxWidth,
  IconMBU,
  IconMeatball,
  IconMGRP,
  IconMLSP,
  IconMMP,
  IconMolecules,
  IconMoon,
  IconNodeEnd,
  IconNodes,
  IconNodeStart,
  IconNodeStep,
  IconOpenInNew,
  IconPause,
  IconPhone,
  IconPhoto,
  IconPlay,
  IconPressure,
  IconProcessing,
  IconQuestion,
  IconQuote,
  IconRecord,
  IconRemove,
  IconReply,
  IconResize,
  IconRestart,
  IconRevert,
  IconRing,
  IconRouble,
  IconRUO,
  IconRUS,
  IconScreen,
  IconSearch,
  IconSelect,
  IconSelectOpen,
  IconSettings,
  IconShuffle,
  IconSmile,
  IconSortDown,
  IconSortDownCenter,
  IconSortUp,
  IconSortUpCenter,
  IconStop,
  IconStorage,
  IconStrikethrough,
  IconSun,
  IconTable,
  IconTarget,
  IconTest,
  IconThumbUp,
  IconTie,
  IconTop,
  IconTrash,
  IconType,
  IconUnderline,
  IconUnsort,
  IconUser,
  IconVZD,
  IconWarning,
  IconWatch,
  IconWideScreen,
  IconWorld,
} from '../index';

import { IconsItem } from './Item/Icons-Item';

const icons = {
  IconAdd,
  IconAlert,
  IconAlignBlocksLeft,
  IconAlignBlocksRight,
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArtBrush,
  IconAttach,
  IconBackward,
  IconBag,
  IconBarrier,
  IconBento,
  IconBold,
  IconBookmarkFilled,
  IconBookmarkStroked,
  IconCalendar,
  IconCamera,
  IconCancel,
  IconChat,
  IconCheck,
  IconClose,
  IconCollapse,
  IconColorFill,
  IconColorText,
  IconColumns,
  IconComment,
  IconConnection,
  IconCopy,
  IconCrown,
  IconCursorMouse,
  IconDiamond,
  IconDisconnection,
  IconDocAdd,
  IconDocBlank,
  IconDocDelete,
  IconDocFilled,
  IconDown,
  IconDownload,
  IconDrag,
  IconDrillingRig,
  IconDrop,
  IconEdit,
  IconExit,
  IconExpand,
  IconEye,
  IconEyeClose,
  IconFavorite,
  IconFilter,
  IconFlagFilled,
  IconFlagStroked,
  IconFolders,
  IconForward,
  IconFunnel,
  IconGas,
  IconGrouping,
  IconHamburger,
  IconHand,
  IconHealth,
  IconIntroduction,
  IconItalic,
  IconKebab,
  IconLayers,
  IconLeaf,
  IconLink,
  IconList,
  IconListNumbered,
  IconLock,
  IconMBU,
  IconMGRP,
  IconMLSP,
  IconMMP,
  IconMail,
  IconMaxHeight,
  IconMaxWidth,
  IconMeatball,
  IconMolecules,
  IconMoon,
  IconNodeEnd,
  IconNodeStart,
  IconNodeStep,
  IconNodes,
  IconOpenInNew,
  IconPause,
  IconPhone,
  IconPhoto,
  IconPlay,
  IconPressure,
  IconProcessing,
  IconQuestion,
  IconQuote,
  IconRUO,
  IconRUS,
  IconRecord,
  IconRemove,
  IconReply,
  IconResize,
  IconRestart,
  IconRevert,
  IconRing,
  IconRouble,
  IconScreen,
  IconSearch,
  IconSelect,
  IconSelectOpen,
  IconSettings,
  IconShuffle,
  IconSmile,
  IconSortDown,
  IconSortDownCenter,
  IconSortUp,
  IconSortUpCenter,
  IconStop,
  IconStorage,
  IconStrikethrough,
  IconSun,
  IconTable,
  IconTarget,
  IconTest,
  IconThumbUp,
  IconTie,
  IconTop,
  IconTrash,
  IconType,
  IconUnderline,
  IconUnsort,
  IconUser,
  IconVZD,
  IconWarning,
  IconWatch,
  IconWideScreen,
  IconWorld,
};

type IconsKeysType = keyof typeof icons;
const iconsKeys = Object.keys(icons) as IconsKeysType[];

storiesOf('icons/common', module)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-icons--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      {iconsKeys.map((name) => {
        const Icon = icons[name];
        return <IconsItem key={name} name={name} icon={Icon} />;
      })}
    </div>
  ));