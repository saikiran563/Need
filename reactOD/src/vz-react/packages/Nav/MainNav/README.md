CSS
===

```
.vz-odt--mainnav__container {
    width: 100%;
    height: 3.125rem;
    border-bottom: 1px #cccccc;
    border-style: solid;
    display: none;
}

.vz-odt--mainnav {
    margin: 0 auto;
    max-width: 79.5rem;
    height: 3.125rem;
    display: flex;
    flex-direction: row;
    padding-left: 1.25rem;
}
.vz-odt--mainnav > * {
    margin-right: 1.925rem;
}

@media (min-width: 780px) {
    .vz-odt--mainnav__container {
        display: block;
    }
}
```