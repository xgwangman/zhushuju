import React, {
	Component,
	PropTypes
} from 'react';
import TreeView from './TreeView'
export default class TreePanel extends Component {
	constructor(props) {
		super(props);
	};
	render() {
		return (
			<div>
                <div className="input-group" >
                    <input type="text" className="form-control" placeholder="请输入要查找的关键字"/>
                    <span className="input-group-btn">
				        <button className="btn btn-default" type="button" onClick = {this.props.onRefreshTree}>Go!</button>
				    </span>
                </div>
                <div style={{marginTop:20}}>
                    <TreeView data={this.props.data} color={"#428bca"}/>
                </div>
            </div>
		);
	}
};