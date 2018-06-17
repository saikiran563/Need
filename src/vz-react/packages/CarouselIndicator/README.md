CSS
===

```
.vz-odt--carouselindicator-container {
    width:100%;
    height: 5px;
    margin: 0 0 1.25rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.vz-odt--carouselindicator--bar {
    position: relative;
    margin: 0 2px 0 2px;
    width: 1.5rem;
    border-bottom: 1px solid #d8dada; 
    transition-duration: 300ms;
    transition-timing-function: ease-out;
}

.vz-odt--carouselindicator--bar.is-active {
    border-bottom: 4px solid #000000; 
}

@media (min-width: 415px) {
    .vz-odt--carouselindicator-container {
        display: none;
    }
}

```