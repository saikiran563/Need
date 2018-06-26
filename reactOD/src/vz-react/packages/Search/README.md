CSS
===

```
/* vz-odt--search-input for basic search input testing only*/
.vz-odt--search-input {
    font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
    font-size: 4rem;
    position: absolute;
    display: inline-block;
    border-bottom-color: #cccccc;
    border-bottom-style: solid;
    border-width: 0 0 1px 0;
    padding-top: 0rem;
    padding-bottom: 0rem;
    height: 4.5rem;
    text-align: left;
    color: #CCCCCC;
    min-width: 1rem;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
}


.vz-odt--search-input:focus {
    color:#000;
    border-bottom-color: #b90000;
    border-bottom-style: solid;
    outline: none;
}

.vz-odt--search-bottomline {
    position: absolute;
    border-bottom-color: #cccccc;
    border-bottom-style: solid;
    border-width: 0 0 1px 0;
    width: 100%;
    height: 2.5rem;
}

.vz-odt--search-magnifier {
    position: absolute;
    top: .2rem;
    right: 0rem;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0.25rem 0.25rem 0.125rem;
}

.vz-odt--search-magnifier:focus {
    outline: none
}

.vz-odt--search-magnifier__icon {
    width: 1.7rem;
    height: 1.7rem;
}

.vz-odt--search-magnifier__icon:hover {
    fill: #999999;
}

.vz-odt--search-clear {
    position: absolute;
    top: .1rem;
    right: 1.5rem;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0.25rem 0.25rem 0.125rem;
    transition: opacity 200ms;
    opacity: 0;
    visibility: hidden;
}

.vz-odt--search-clear.is-visible {
    opacity: 1;
    visibility: visible;
}

.vz-odt--search-clear:focus {
    outline: none
}

.vz-odt--search-clear__icon {
    width: 1.7rem;
    height: 1.7rem;
}

.vz-odt--search-clear__icon:hover {
    fill: #999999;
}


.vz-odt--search-input-bottomline_highlight {
    font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
    font-size: 2rem;
    height: 2.5rem;
    position: absolute;
    top: 2px;
    display: inline-block;
    border-bottom-color: #cccccc;
    border-bottom-style: solid;
    border-width: 0 0 2px 0;
    text-align: left;
    color: rgba(0, 0, 0, 0);
    min-width: 0rem;
    overflow: hidden;
    white-space: nowrap;
    max-width: 90%;
    border-bottom-color: #CD040B;
    border-bottom-style: solid;
    outline: none;
    background:transparent;
}

.vz-odt--search-input_baseline {
    position: absolute;
    top: 2px;
    border-bottom-color: #666666;
    border-bottom-style: solid;
    border-width: 0 0 2px 0;
    width: 100%;
    height: 2.5rem;
    background:transparent;
}

.vz-odt--smartsearch {
    position: relative;
    width: 100%;
    margin: 0.25rem 0 1.5rem 0;
}

.vz-odt--smartsearch-mic {
    position: absolute;
    top: .2rem;
    right: 2px;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;
    border: none;
}

.vz-odt--smartsearch-mic:focus {
    outline:none;
}

.vz-odt--smartsearch-mic__icon {
    height: 2rem;
}

.vz-odt--smartsearch-mic__icon:hover {
    fill: #999999;
}

.vz-odt--herosearch {
    position: relative;
    margin: 0 auto;
    max-width: 79.5rem;
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1.25rem;
    margin: 0 auto 3rem auto;
}

.vz-odt--herosearch.is-active {
    z-index: 9010;
}

.vz-odt--herosearch--modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0.25rem 0.25rem 0.125rem;
    visibility: hidden;
}

.vz-odt--herosearch--modal-close.is-active {
    visibility: visible;
    z-index: 9020;
}

.vz-odt--herosearch--modal-close:focus {
    outline:none;
}

.vz-odt--herosearch--modal-close__icon {
    width: 2rem;
    height: 2rem;
}

.vz-odt--herosearch--modal-close__icon:hover {
    fill: #999999;
}

.vz-odt--herosearch--modal-moreresultCTA {
    position: relative;
    z-index: 9020;
    margin-left: 1.25rem;
    margin-bottom: 2rem;
}

.vz-odt--herosearch--modal--moreresultCTA-container {
    position: relative;
    max-width: 79.5rem;
    margin: 0 auto 0 auto;
}

.vz-odt--herosearch--greeting {
    font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
    color: #000000;
    font-size: 2rem;
    line-height: 2rem;
    letter-spacing: .0625rem;
    margin: 0 0 1.25rem 0;
    transition-duration: 250ms;
    transition-timing-function: ease-out;
    opacity: 1;
}

.vz-odt--herosearch--greeting.is-inactive {
    opacity: 0;
}

.vz-odt--herosearch--CTA-button {
    margin-top: 2.5rem;
}

.vz-odt--smartsearch__input__typist {
    position: absolute;
    top: -2px;
    color: #ECECEC;
    height: 2.5rem;
    padding: 0rem 0rem;
    font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
    font-size: 2rem;
    width: 100%;
    padding-top: 0rem;
    padding-bottom: 0rem;
    animation: vz-odt--smartsearch__input__typist-anim 1000ms;
    -webkit-animation: vz-odt--smartsearch__input__typist-anim 1000ms;
    animation-timing-function: linear;
    -webkit-animation-timing-function: linear;
}

@keyframes vz-odt--smartsearch__input__typist-anim {
    from {opacity: .3;}
    to {opacity: 1;}
}

@-webkit-keyframes vz-odt--smartsearch__input__typist-anim {
    from {opacity: .3;}
    to {opacity: 1;}
}

.vz-odt--herosearch--modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    content: '';
    opacity: 0;
    background-color: rgba(245, 245, 245, 0.8);
    transition: opacity 200ms, visibility 0s 300ms;
    visibility: hidden;
}

.vz-odt--herosearch--modal.is-visible {
    z-index: 9000;
    opacity: 1;
    transition: opacity 300ms;
    visibility: visible;
}


/*******************************************************
 *      Auto suggest custom styles
 *********************************************************/

.react-autosuggest__container {
    position: absolute;
    width: 100%;
  }

  
  .react-autosuggest__input {
    width: 90%;
    padding: 0rem 0rem;
    font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
    font-size: 2rem;
    height: 2.5rem;
    padding-top: 0rem;
    padding-bottom: 0rem;
    border-bottom-color: #cccccc;
    border-bottom-style: solid;
    border-width: 0;
    background:transparent;
  }

  .react-autosuggest__input::placeholder {
    color: #ECECEC;
  }
  
  .react-autosuggest__input::-webkit-input-placeholder {
    color: #ECECEC;
  }

  .react-autosuggest__input::-moz-placeholder {
    color: #ECECEC;
  }
  
  .react-autosuggest__input--focused {
    outline: none;
  }
  
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .react-autosuggest__suggestions-container {
    display: none;
  }
  
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 2.75rem;
    font-size: 2rem;
    width: 100%;
    padding: 0 0 1.25rem 0;
    background-color: #ffffff;
    font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
    font-weight: 300;
    animation: react-autosuggest__suggestions-container--fadein 250ms;
    -webkit-animation: react-autosuggest__suggestions-container--fadein 250ms;
    animation-timing-function: ease-out;
    -webkit-animation-timing-function: ease-out;
    z-index: 9020;
  }

  @keyframes react-autosuggest__suggestions-container--fadein {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @-webkit-keyframes react-autosuggest__suggestions-container--fadein {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .react-autosuggest__suggestion {
    cursor: pointer;
    color: #888888;
    padding: .2rem 0;
  }
  
  .react-autosuggest__suggestion--highlighted {
    background-color: #eeeeee;
  }
  
  .react-autosuggest__suggestion-match {
    color: #dddddd;
  }


  @media (min-width: 780px) {
    .vz-odt--search-input-bottomline_highlight {
        font-size: 4rem;
        height: 4.5rem;
    }

    .vz-odt--herosearch--greeting {
        font-size: 4rem;
        line-height: 4rem;
    }

    .vz-odt--smartsearch__input__typist {
        height: 4.5rem;
        font-size: 4rem;
        background: transparent;
    }

    .react-autosuggest__input {
        font-size: 4rem;
        height: 4.5rem;
        background: transparent;
    }

    .react-autosuggest__suggestions-container--open {
        top: 4.75rem;
        font-size: 4rem;
    }

    .vz-odt--search-input_baseline {
        height: 4.5rem;
        background: transparent;
    }

    .vz-odt--herosearch--CTA-button {
        margin-top: 4.5rem;
    }

    .vz-odt--search-clear {
        top: .6rem;
        right: 2.5rem;
    }

    .vz-odt--smartsearch-mic {
        top: .5rem;
        right: 2px;
    }

    .vz-odt--smartsearch-mic__icon {
        height: 2.25rem;
    }
}
```