CSS
===

```
.vz-odt--btn {
  font-family: 'NeueHaasGroteskDisplayBold', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  width: fit-content;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-negative: 0;
  flex-shrink: 0; }

.vz-odt--btn__round {
  letter-spacing: 0.5px;
  font-size: .75rem;
  line-height: 1.4rem;
  padding: .5rem 2.5rem .5rem 2.5rem;
  border-radius: 72px;
  text-align: center;
  text-decoration: none;
  transition-duration: 250ms;
  transition-timing-function: ease-out;
  white-space: nowrap;
  vertical-align: middle; }

.vz-odt--btn:disabled {
  cursor: not-allowed;
  opacity: 0.5; }

.vz-odt--btn--primary {
  background-color: #000000;
  border-width: 0;
  color: #fff; }

.vz-odt--btn--primary.is-inverted {
  background-color: #FFF;
  border-width: 1px;
  border-color: #000000;
  border-style: solid;
  color: #000000; }

.vz-odt--btn--primary:focus, .vz-odt--btn--primary:hover {
  background-color: #333333;
  outline: none; }

.vz-odt--btn--primary.is-inverted:hover {
  color: #333333;
  background-color: #FFFFFF; }

.vz-odt--btn--primary:active {
  background-color: #555; }

.vz-odt--btn--secondary {
  background-color: #FFF;
  border-width: 1px;
  border-color: #000000;
  border-style: solid;
  color: #000000; }

.vz-odt--btn--secondary.is-inverted {
  background-color: #000000;
  border-width: 1px;
  border-style: solid;
  color: #fff; }

.vz-odt--btn--secondary:focus, .vz-odt--btn--secondary:hover {
  background-color: #eeeeee;
  outline: none; }

.vz-odt--btn--secondary.is-inverted:hover {
  background-color: #333333;
  outline: none; }

.vz-odt--btn--secondary:active {
  background-color: #999999; }

.vz-odt--btn--secondary + .vz-odt--btn--primary {
  margin-left: 1rem; }

.vz-odt--btn--cta__chevron {
  letter-spacing: 0.5px;
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0;
  text-align: left;
  text-decoration: none;
  transition-duration: 250ms;
  transition-timing-function: ease-in;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  margin-right: -6px;
  margin-bottom: -5px; }

.vz-odt--btn--cta__chevron:hover:enabled {
  fill: #6e6e6e; }

.vz-odt--btn--cta__chevron:hover:enabled .vz-odt--btn--cta__chevron__icon {
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  fill: #333333; }

.vz-odt--btn--cta__chevron__icon {
  height: 1rem;
  margin-top: -1px; }

.vz-odt--btn--cta__chevron__icon.no-label {
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 0; }

.vz-odt--btn--cta__text_chevron {
  letter-spacing: 0.5px;
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0;
  text-align: left;
  text-decoration: none;
  transition-duration: 250ms;
  transition-timing-function: ease-in;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  margin-right: 1rem;
  margin-bottom: -.75rem; }

.vz-odt--btn--global--nav__main {
  font-family: "NeueHaasGroteskDisplay", Arial, Helvetica, sans-serif;
  color: #747676;
  font-size: .875rem;
  line-height: .875rem; }

.vz-odt--btn--nav__main {
  font-family: "NeueHaasGroteskDisplayBold", Arial, Helvetica, sans-serif;
  color: #000000;
  font-size: .8125rem;
  line-height: .8125rem;
  width: fit-content;
  height: 3.125rem;
  transition-duration: 250ms;
  transition-timing-function: ease-in;
  border-bottom-color: rgba(255, 255, 255, 0);
  border-bottom-style: solid;
  border-width: 0 0 2px 0;
  background-color: rgba(255, 255, 255, 0);
  outline: none;
  padding: 0; }

.vz-odt--btn--nav__main:hover {
  border-bottom-color: #d52b1e;
  color: #000000; }

.vz-odt--btn--nav__main:disabled {
  border-bottom-color: #d52b1e;
  opacity: 1; }

```