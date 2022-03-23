/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { IS_TOUCH_SUPPORTED } from "../../environment/touchSupport";
import EventListenerBase from "../eventListenerBase";
import ListenerSetter from "../listenerSetter";
import safeAssign from "../object/safeAssign";
import findUpClassName from "./findUpClassName";

export default class ControlsHover extends EventListenerBase<{
  toggleControls: (show: boolean) => void
}> {
  protected showControlsTimeout: number;
  protected controlsLocked: boolean;

  protected canHideControls: () => boolean;
  protected element: HTMLElement;
  protected listenerSetter: ListenerSetter;
  protected showOnLeaveToClassName: string;

  constructor() {
    super(false);
    this.showControlsTimeout = 0;
  }
  
  public setup(options: {
    element: HTMLElement, 
    listenerSetter: ListenerSetter, 
    canHideControls?: () => boolean,
    showOnLeaveToClassName?: string
  }) {
    safeAssign(this, options);

    const {listenerSetter, element} = this;

    if(IS_TOUCH_SUPPORTED) {
      listenerSetter.add(element)('click', () => {
        this.toggleControls();
      });

      /* listenerSetter.add(player)('touchstart', () => {
        showControls(false);
      });

      listenerSetter.add(player)('touchend', () => {
        if(player.classList.contains('is-playing')) {
          showControls();
        }
      }); */
    } else {
      listenerSetter.add(element)('mousemove', () => {
        this.showControls();
      });

      listenerSetter.add(element)('mouseenter', () => {
        this.showControls(false);
      });

      listenerSetter.add(element)('mouseleave', (e) => {
        if(e.relatedTarget && this.showOnLeaveToClassName && findUpClassName(e.relatedTarget, this.showOnLeaveToClassName)) {
          this.showControls(false);
          return;
        }
        
        this.hideControls();
      });
    }
  }

  public hideControls = () => {
    clearTimeout(this.showControlsTimeout);
    this.showControlsTimeout = 0;

    const isShown = this.element.classList.contains('show-controls');
    if(this.controlsLocked !== false) {
      if((this.canHideControls ? !this.canHideControls() : false) || !isShown || this.controlsLocked) {
        return;
      }
    } else if(!isShown) {
      return;
    }
    
    this.dispatchEvent('toggleControls', false);
    this.element.classList.remove('show-controls');
  };
  
  public showControls = (setHideTimeout = true) => {
    if(this.showControlsTimeout) {
      clearTimeout(this.showControlsTimeout);
      this.showControlsTimeout = 0;
    } else if(!this.element.classList.contains('show-controls') && this.controlsLocked !== false) {
      this.dispatchEvent('toggleControls', true);
      this.element.classList.add('show-controls');
    }

    if(!setHideTimeout || this.controlsLocked) {
      return;
    }

    this.showControlsTimeout = window.setTimeout(this.hideControls, 3e3);
  };

  public toggleControls = (show?: boolean) => {
    const isShown = this.element.classList.contains('show-controls');

    if(show === undefined) {
      if(isShown) this.hideControls();
      else this.showControls();
    } else if(show === isShown) return;
    else if(show === false) this.hideControls();
    else this.showControls();
  };

  public lockControls(visible: boolean) {
    this.controlsLocked = visible;

    this.element.classList.toggle('disable-hover', visible === false);
    this.toggleControls(visible);
  }
}
