const questionsType = {};
const numInputs = {};

numInputs['bracemap'] = 6;
questionsType['bracemap'] =
    '<h4 class="header">Brace Map</h4>' +
    '<div class="divider"></div>' +
    '<div class="row description">' +
    '    <div class="card">' +
    '        <div class="card-content">' +
    '            <div class="input-field col s12">' +
    '                <textarea class="materialize-textarea" length="150"></textarea>' +
    '                <label>Description</label>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>' +
    '<div class="row col s12 m6">' +
    '    <div class="card col m5 s12">' +
    '        <div class="card-image">' +
    '            <img class="question" src="../assets/images/questions/braceMap.PNG">' +
    '        </div>' +
    '    </div>' +
    '    <div class="card col m7 s12">' +
    '        <div class="card-content">' +
    '            <form class="col s12 m12 submitQuestion" name="8">' +
    '                <div class="answers">' +
    '                    <div class="row">' +
    '                        <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                        </div>' +
    '                     </div>' +
    '                    <div class="row">' +
    '                        <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel1}}}' +
    '                        </div>' +
    '                     </div>' +
    '                    <div class="row">' +
    '                        <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel2}}}' +
    '                        </div>' +
    '                     </div>' +
    '                    <div class="row">' +
    '                        <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel3}}}' +
    '                        </div>' +
    '                     </div>' +
    '                    <div class="row">' +
    '                        <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel4}}}' +
    '                        </div>' +
    '                     </div>' +
    '                    <div class="row">' +
    '                        <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel5}}}' +
    '                        </div>' +
    '                     </div>' +
    '                    <div class="row">' +
    '                        <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel7}}}' +
    '                        </div>' +
    '                    </div>' +
    '                </div>' +
    '                {{{footer}}}' +
    '            </form>' +
    '        </div>' +
    '    </div>' +
    '</div>';

numInputs['bridgemap'] = 4;
questionsType['bridgemap'] =
    '<h4 class="header">Bridge Map</h4>' +
    '    <div class="divider"></div>' +
    '    <div class="row description">' +
    '        <div class="card">' +
    '            <div class="card-content">' +
    '                <div class="input-field col s12">' +
    '                    <textarea class="materialize-textarea" length="150"></textarea>' +
    '                    <label>Description</label>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="row description col s6 m6">' +
    '        <div class="card col m5 s12 question">' +
    '            <div class="card-image ">' +
    '                <img src="../assets/images/questions/bridgeMap.PNG">' +
    '            </div>' +
    '        </div>' +
    '        <div class="card col m7 s12">' +
    '            <div class="card-content">' +
    '                <form class="col s12 m12 submitQuestion" name="1">' +
    '                    <div class="answers">' +
    '                        <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel1}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel2}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel3}}}' +
    '                            </div>' +
    '                        </div>' +
    '                {{{footer}}}' +
    '                </form>' +
    '            </div>' +
    '        </div>' +
    '    </div>';

numInputs['mflowmap'] = 6;
questionsType['mflowmap'] =
    '<h4 class="header">Multi-Flow Map</h4>' +
    '    <div class="divider"></div>' +
    '    <div class="row description">' +
    '        <div class="card">' +
    '            <div class="card-content">' +
    '                <div class="input-field col s12">' +
    '                    <textarea class="materialize-textarea" length="150"></textarea>' +
    '                    <label>Description</label>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="row description col s6 m6">' +
    '        <div class="card col m5 s12 question">' +
    '            <div class="card-image ">' +
    '                <img src="../assets/images/questions/mFlowMap.PNG">' +
    '            </div>' +
    '        </div>' +
    '        <div class="card col m7 s12">' +
    '            <div class="card-content">' +
    '                <form class="col s12 m12 submitQuestion" name="1">' +
    '                    <div class="answers">' +
    '                        <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel1}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel2}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel3}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel4}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel5}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel6}}}' +
    '                            </div>' +
    '                       </div>' +
    '                {{{footer}}}' +
    '                </form>' +
    '            </div>' +
    '        </div>' +
    '    </div>';

numInputs['fmap'] = 6;
questionsType['fmap'] =
    '<h4 class="header">Flow Map</h4>' +
    '    <div class="divider"></div>' +
    '    <div class="row description">' +
    '        <div class="card">' +
    '            <div class="card-content">' +
    '                <div class="input-field col s12">' +
    '                    <textarea class="materialize-textarea" length="150"></textarea>' +
    '                    <label>Description</label>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="row description col s6 m6">' +
    '        <div class="card col m5 s12 question">' +
    '            <div class="card-image ">' +
    '                <img src="../assets/images/questions/flowMap.PNG">' +
    '            </div>' +
    '        </div>' +
    '        <div class="card col m7 s12">' +
    '            <div class="card-content">' +
    '                <form class="col s12 m12 submitQuestion" name="1">' +
    '                    <div class="answers">' +
    '                        <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel1}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel2}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel3}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel4}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel5}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel6}}}' +
    '                            </div>' +
    '                       </div>' +
    '                {{{footer}}}' +
    '                </form>' +
    '            </div>' +
    '        </div>' +
    '    </div>';


numInputs['dbubblemap'] = 10;
questionsType['dbubblemap'] =
    '<h4 class="header">Double Bubble Map</h4>' +
    '    <div class="divider"></div>' +
    '    <div class="row description">' +
    '        <div class="card">' +
    '            <div class="card-content">' +
    '                <div class="input-field col s12">' +
    '                    <textarea class="materialize-textarea" length="150"></textarea>' +
    '                    <label>Description</label>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="row description col s6 m6">' +
    '        <div class="card col m5 s12 question">' +
    '            <div class="card-image ">' +
    '                <img src="../assets/images/questions/dBubbleMap.PNG">' +
    '            </div>' +
    '        </div>' +
    '        <div class="card col m7 s12">' +
    '            <div class="card-content">' +
    '                <form class="col s12 m12 submitQuestion" name="1">' +
    '                    <div class="answers">' +
    '                        <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel1}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel2}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel3}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel4}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel5}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel6}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel7}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel8}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel9}}}' +
    '                            </div>' +
    '                       </div>' +
    '                {{{footer}}}' +
    '                </form>' +
    '            </div>' +
    '        </div>' +
    '    </div>';


numInputs['cframemap'] = 6;
questionsType['cframemap'] =
    '<h4 class="header">Circle Map and Frame</h4>' +
    '    <div class="divider"></div>' +
    '    <div class="row description">' +
    '        <div class="card">' +
    '            <div class="card-content">' +
    '                <div class="input-field col s12">' +
    '                    <textarea class="materialize-textarea" length="150"></textarea>' +
    '                    <label>Description</label>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="row description col s6 m6">' +
    '        <div class="card col m5 s12 question">' +
    '            <div class="card-image ">' +
    '                <img src="../assets/images/questions/cFrameMap.PNG">' +
    '            </div>' +
    '        </div>' +
    '        <div class="card col m7 s12">' +
    '            <div class="card-content">' +
    '                <form class="col s12 m12 submitQuestion" name="1">' +
    '                    <div class="answers">' +
    '                        <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel1}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel2}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel3}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel4}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel5}}}' +
    '                            </div>' +
    '                       </div>' +
    '                {{{footer}}}' +
    '                </form>' +
    '            </div>' +
    '        </div>' +
    '    </div>';


numInputs['treemap'] = 6;
questionsType['treemap'] =
    '<h4 class="header">Tree Map</h4>' +
    '    <div class="divider"></div>' +
    '    <div class="row description">' +
    '        <div class="card">' +
    '            <div class="card-content">' +
    '                <div class="input-field col s12">' +
    '                    <textarea class="materialize-textarea" length="150"></textarea>' +
    '                    <label>Description</label>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="row description col s6 m6">' +
    '        <div class="card col m5 s12 question">' +
    '            <div class="card-image ">' +
    '                <img src="../assets/images/questions/treeMap.PNG">' +
    '            </div>' +
    '        </div>' +
    '        <div class="card col m7 s12">' +
    '            <div class="card-content">' +
    '                <form class="col s12 m12 submitQuestion" name="1">' +
    '                    <div class="answers">' +
    '                        <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel1}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel2}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel3}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel4}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel5}}}' +
    '                            </div>' +
    '                       </div>' +
    '                {{{footer}}}' +
    '                </form>' +
    '            </div>' +
    '        </div>' +
    '    </div>';


numInputs['bubblemap'] = 6;
questionsType['bubblemap'] =
    '<h4 class="header">Brace Map</h4>' +
    '    <div class="divider"></div>' +
    '    <div class="row description">' +
    '        <div class="card">' +
    '            <div class="card-content">' +
    '                <div class="input-field col s12">' +
    '                    <textarea class="materialize-textarea" length="150"></textarea>' +
    '                    <label>Description</label>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="row description col s6 m6">' +
    '        <div class="card col m5 s12 question">' +
    '            <div class="card-image ">' +
    '                <img src="../assets/images/questions/bubbleMap.PNG">' +
    '            </div>' +
    '        </div>' +
    '        <div class="card col m7 s12">' +
    '            <div class="card-content">' +
    '                <form class="col s12 m12 submitQuestion" name="1">' +
    '                    <div class="answers">' +
    '                        <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                           {{{inputLabel0}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel1}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel2}}}' +
    '                            </div>' +
    '                        </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel3}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel4}}}' +
    '                            </div>' +
    '                       </div>' +
    '                       <div class="row">' +
    '                            <div class="input-field col s12 textInput" style="display: block">' +
    '                            {{{inputLabel5}}}' +
    '                            </div>' +
    '                       </div>' +
    '                {{{footer}}}' +
    '                </form>' +
    '            </div>' +
    '        </div>' +
    '    </div>';