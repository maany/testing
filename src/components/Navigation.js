import React, {Component} from "react";
import './Navigation.css';

export default class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            initial_position: 0,
            final_position: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        // swap order in props based on increment or decrement in position
        var temp = this.props.locations[nextState.initial_position]
        nextProps.locations[nextState.initial_position] = this.props.locations[nextState.final_position]
        nextProps.locations[nextState.final_position] = temp;
        return nextProps
    }
    // Used for rendering
    getClasses(ctx, index) {
        let classes = `material-icons ${ctx}`;
        if (ctx === 'dots') {
            if (this.isLast(index)) {
                classes += ' hidden';
            }
        } else {
            classes += this.isLast(index) ? ' small' : ' x-small';
            if (index === 0) {
                classes += ' first';
            }
        }
        return classes;
    }

    // Used for rendering
    isLast(index) {
        return index === this.props.locations.length - 1;
    }

    render() {
        return (
            <div className="layout-row align-items-center justify-content-center navigation-screen">
                <div className="card layout-row flat map-card">
                    <section className="card pb-16 pr-16 flex-auto layout-column justify-content-center">
                        <ul className="pl-0" data-testid="location-list">
                            {/* Use this li for rendering each location item as it contains all the data-testid attributes required for the tests to pass */}
                            {this.props.locations.map((location, index) => {
                                return(
                                    <li key={'row' + index} data-testid={'location-' + index}
                                    className="layout-row justify-content-between align-items-center mr-8 pl-40 relative">
                                    <div className="layout-column justify-content-start align-items-center handle">
                                        <i className={this.getClasses('marker', index)}>{this.isLast(index) ? 'room' : 'radio_button_checked'}</i>
                                        <i className={this.getClasses('dots', index)}>more_vert</i>
                                   </div>
                                    <div className="location-name">
                                        <p className="caption text-start mb-4" data-testid="location">{location}</p>
                                     </div>
                                    <div>
                                        
                                       {index != 0 && 
                                            <button className="icon-only small mx-0" data-testid="up-button"
                                                onClick = { () =>{ 
                                                    this.setState({initial_position: index, final_position: index - 1})
                                                }}
                                            >
                                                <i className="material-icons">arrow_upward</i>
                                            </button>
                                        }
                                        { index != this.props.locations.length - 1 &&
                                            <button className="icon-only small mx-0" data-testid="down-button"
                                                onClick = { () =>{ 
                                                    this.setState({initial_position: index, final_position: index + 1})
                                                }}
                                            >
                                                <i className="material-icons">arrow_downward</i>
                                            </button>
                                        }
                                    </div>
                                </li>
                                )
                            })}
                                
                        </ul>
                    </section>
                    <section className="flex-auto">
                        <img src="images/map.svg" className="fill" alt="map"/>
                    </section>
                </div>

            </div>
        );
    }
}
