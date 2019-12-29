<nav id="sidebar" class="op3-sidebar">
    <div class="wrapper" data-trap-scroll="">
        <div class="sidebar-tabs">
            <div class="tab-content selected" data-tab="elements">
                <div class="categories">
                    <h2 class="tab-heading">Elements</h2>
                    <div class="content">
                    </div>
                </div>

                <div class="options">
                    <form>
                        <div id="tab-heading-element" class="tab-heading">
                            <h2 class="tab-heading-title">[Element Name]</h2>
                            <div class="tab-heading-button-wrapper">
                                <button class="tab-heading-button active" data-op3-element-state="normal" type="button">Normal</button>
                                <button class="tab-heading-button" data-op3-element-state="hover" type="button">Hover</button>
                            </div>
                            <div class="tab-heading-select-parent-element">
                                <button class="tab-heading-button" type="button">Select Parent Element</button>
                            </div>
                        </div>
                        <ul class="op3-tabs">
                            <li class="op3-tab selected" data-tab="design">
                                <button type="button">
                                    <span class="op3-icon op3-icon-wand-99-2"></span>
                                    Design
                                </button>
                            </li>
                            <li class="op3-tab" data-tab="style">
                                <button type="button">
                                    <span class="op3-icon op3-icon-paint-37-2"></span>
                                    Style
                                </button>
                            </li>
                            <li class="op3-tab" data-tab="advanced">
                                <button type="button">
                                    <span class="op3-icon op3-icon-preferences-2"></span>
                                    Advanced
                                </button>
                            </li>
                            <li class="op3-tab" data-tab="global-element">
                                <button type="button">
                                    <span class="op3-icon op3-icon-globe-1"></span>
                                    Global Element
                                </button>
                            </li>
                        </ul>
                        <div class="tab-content sidebar-style-picker selected" data-tab="design" data-tab-persist="true">
                            <header class="op3-options-group-header" data-op3-element-options-group-id="style-picker"></header>
                            <div class="style-picker-search-container">
                                <input class="style-picker-search" type="search" placeholder="Filter Styles" />
                            </div>
                            <div id="style-picker-content" class="style-picker-content"></div>
                        </div>
                        <div class="tab-content" data-tab="style"></div>
                        <div class="tab-content" data-tab="advanced"></div>
                        <div class="tab-content" data-tab="global-elements"></div>
                        <div class="tab-content" data-tab="hover"></div>
                    </form>
                </div>
            </div>

            <div class="tab-content" data-tab="global-elements">
                <div class="tab-heading-wrapper">
                    <h2 class="tab-heading">Global Elements</h2>
                    <div class="tab-heading-search-wrapper global-elements-search-wrapper">
                        <input class="tab-heading-search-input" name="global-elements-search" />
                        <i class="tab-heading-search-icon op3-icon op3-icon-zoom-2-2" data-op3-icon="op3-icon-zoom-2-2"></i>
                    </div>
                </div>
                <!--
                <ul class="op3-tabs">

                </ul>
                -->
                <ul class="content template-thumb-list">
                </ul>
            </div>

            <div class="blocks tab-content" data-tab="blocks">
                <div class="tab-heading-wrapper">
                    <h2 class="tab-heading">Sections</h2>
                    <div class="tab-heading-search-wrapper blocks-search-wrapper">
                        <input class="tab-heading-search-input" name="blocks-search" />
                        <i class="tab-heading-search-icon op3-icon op3-icon-zoom-2-2" data-op3-icon="op3-icon-zoom-2-2"></i>
                    </div>
                </div>
                <ul class="op3-tabs">
                    <li class="op3-tab selected" data-tab="light">
                        <button type="button">
                            <span class="op3-icon op3-icon-bulb-63-1"></span>
                            Light
                        </button>
                    </li>
                    <li class="op3-tab" data-tab="dark">
                        <button type="button">
                            <span class="op3-icon op3-icon-bulb-63-2"></span>
                            Dark
                        </button>
                    </li>
                </ul>
                <div class="block-categories">
                    <label>Categories</label>
                    <select name="block-categories">
                        <!-- <option value="">None</option> -->
                    </select>
                </div>
                <ul class="content template-thumb-list">
                    <!--
                        <div class="category-tab"></div>
                    -->
                </ul>
            </div>

            <div class="settings tab-content" data-tab="settings">
                <form>
                    <div id="tab-heading-page" class="tab-heading">
                        <h2 class="tab-heading-title">Settings</h2>
                    </div>
                    <!--
                    <div class="note">
                        <p>loading...</p>
                    </div>
                    -->
                </form>
            </div>

            <div class="favourites tab-content" data-tab="favourites">
                <h2 class="tab-heading">Favourites</h2>
                <div class="note">
                    <p>Work in progress...</p>
                </div>
            </div>
        </div>
    </div>
    <a href="#" class="switcher" onclick="return !!OP3.LiveEditor.sidebarToggle()">
        <span class="op3-icon op3-icon-small-right"></span>
    </a>
</nav>
