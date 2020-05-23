class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.initialHtml = `
        <style>
            .content {
                transition: all 0.5s;
                background: #f5f5f5;
                height: 100%;
                top: 0;
                padding: 45px;
            }
            .close {
                color: #7f8fa6;
                font-size: 24px;
                position: absolute;                     
                cursor: pointer;
                top: 15px;
                right: 10px;
            }
            .main {   
                position: fixed;
                top: 25px;
                left: 10px;
            }
            .lines {    
                cursor: pointer;
            }
            .line {
                background-color: #1289A7;
                margin-bottom: 2px;
                width: 25px;
                height: 2px;
            }
        </style>
        
        <div class="main"> 
            <div class="lines">
                <div class='line'></div>
                <div class='line'></div>
                <div class='line'></div> 
            </div>
            <div class="content">
                <span class="close">X</span>
                <slot></slot>
            </div>
        </div>`;
        this.shadowRoot.innerHTML = this.initialHtml;
    }

    connectedCallback() {
        this.registerOpenListener();
    }

    registerOpenListener() {
        this.hideElement(this.shadowRoot.querySelector('.content')) 
        const div = this.shadowRoot.querySelector('.main');
        const close = this.shadowRoot.querySelector('.close');
        div.addEventListener('click', this.toggleSidebar.bind(this, true));
        close.addEventListener('click', this.toggleSidebar.bind(this, false));
    }

    hideElement( element ) {
        element.style.position = "fixed";
        element.style.left = "-1000px";
    }

    showElement( element, value ) {
        element.style.position = "fixed";
        element.style.left = value;
    }

    toggleSidebar( flag, event ) {
        
        event.stopPropagation();    
        const content = this.shadowRoot.querySelector('.content');
        flag ? this.showElement(content, 0) : this.hideElement(content);
        const lines = this.shadowRoot.querySelector('.lines');
        flag ? this.hideElement(lines) : this.showElement(lines, '10px');
    }
}

customElements.define('uc-sidebar', Sidebar);