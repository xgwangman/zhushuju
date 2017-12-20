import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import codemirror from 'codemirror';
require('../../../node_modules/codemirror/lib/codemirror.css');

export default class CodeMirror extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        window.codeEditor = codemirror.fromTextArea(document.getElementById('codeEdit'), {
            mode: 'text/x-mysql',
            indentWithTabs: true,
            smartIndent: true,
            lineNumbers: true,
            matchBrackets: true,
            cursorHeight: 0.85,
            autofocus: true,
            extraKeys: {"Ctrl-Space": "autocomplete"},
            hintOptions: {
                tables: {
                    users: {name: null, score: null, birthDate: null},
                    countries: {name: null, population: null, size: null}
                }
            }
        });
        //window.codeEditor.setValue(this.props.sql);
        this.props.codeMirrorIsMount(true);
    }

    render() {
        return (
            <textarea id="codeEdit" ref="codeEditor"
            />
        );
    }

    excuteSqlSentence() {
        let {codeEditor} = this.refs;
        if (codeEditor) {
            let sql = codeEditor.getValue();
        }
    }
}