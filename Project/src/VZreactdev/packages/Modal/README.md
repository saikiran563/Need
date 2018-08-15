CSS
===

```
@import url('../../index.css');

.vz-odt--modal {
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
    background-color: rgba(230, 230, 230, 0.8);
    transition: opacity 200ms, z-index 0s 300ms, visibility 0s 300ms;
    visibility: hidden;
}

.vz-odt--modal.is-visible {
    z-index: 9000;
    opacity: 1;
    transition: opacity 300ms;
    visibility: visible;
}

.vz-odt--modal-container {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    background-color: #fff;
    min-width: 100%;
    max-height: 100%;
    height: 100%;
    padding: 2rem 3% 0rem 3%;
}

@media (min-width: 780px) {
    .vz-odt--modal-container {
      height: auto;
      min-width: 500px;
      max-width: 75%;
      max-height: 90%;
      padding: 2rem 3rem 0 3rem;
    }
}
  
@media (min-width: 1024px) {
    .vz-odt--modal-container {
        max-width: 50%;
        max-height: 80%;
    }
}

.vz-odt--modal-header {
    margin-bottom: 1rem;
}

.vz-odt--modal-header__heading {
    line-height: 3.25rem;
    font-size: 3.25rem;
    font-weight: 600;
    color: #000000;
}

.vz-odt--modal-content {
    font-family: 'NeueHaasGroteskText';
    overflow-y: auto;
    margin-bottom: 2.5rem;
}

.vz-odt--modal-footer {
    margin-top: auto;
    text-align: left;
    background-color: #ffffff;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    padding: 1.5rem 1.5rem;
  }
  
  @media (min-width: 600px) {
    .vz-odt--modal-footer {
      margin-left: -3rem;
      margin-right: -3rem;
      padding: 1.5rem 3rem;
    }
  }

.vz-odt--modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0.25rem 0.25rem 0.125rem;
}

.vz-odt--modal-close:focus {
    outline:none;
}

.vz-odt--modal-close__icon {
    width: 2rem;
    height: 2rem;
}

.vz-odt--modal-close__icon:hover {
    fill: #999999;
}
```