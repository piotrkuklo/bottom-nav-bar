import * as React from 'react';
import { Component } from 'react';

import { Frame, Color } from 'framer';
import GoogleFontLoader from 'react-google-font-loader';

class ButtonBottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            active: props.isActive,
            activeColor: props.activeColor,
            buttonTitle: props.buttonTitle,
            iconData: props.iconData,
            boxWidth: props.boxWidth
        };
    }

    //Change the state after getting new different props.isActive
    componentDidUpdate(prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            this.setState({ active: this.props.isActive });
        }
    }

    render() {
        //Adding the const function from props and const from the state
        const { changePage } = this.props;

        const isActive = this.state.active;
        const buttonTitle = this.state.buttonTitle;
        const activeColor = this.state.activeColor;
        const boxWidth = this.state.boxWidth;
        const iconData = this.state.iconData;

        //Transparent color to remove the default blueish
        const transparent = Color('rgb(230, 230, 230 , 0.0)');

        //A dimensions for icons
        const iconStyle = {
            width: '24px',
            height: '24px'
        };

        //Default transitions and durations - one has a delay to remove the background after text
        const transitionNormal = {
            duration: 0.3
        };
        const transitionDelay = {
            duration: 0.3,
            delay: 0.1
        };

        //Variants for the colored rounded rectangle
        const variantsBG = {
            active: {
                opacity: 0.25,
                width: `${boxWidth}px`,
                transition: transitionNormal
            },
            inactive: {
                opacity: 0.0,
                width: '48px',
                transition: transitionDelay
            }
        };

        //Variants for button text
        const variantsText = {
            active: {
                opacity: 1.0,
                left: 40,
                transition: transitionNormal
            },
            inactive: {
                opacity: 0.0,
                left: 30,
                transition: transitionNormal
            }
        };

        return (
            <div className="ButtonBottom">
                <GoogleFontLoader
                    fonts={[
                        {
                            font: 'Roboto',
                            weights: [700]
                        }
                    ]}
                />
                {/* Frame with the colored rounded rectangle */}
                <Frame
                    className="BackgroundButtonBottom"
                    position={'relative'}
                    background={activeColor}
                    variants={variantsBG}
                    initial="inactive"
                    height={50}
                    radius={50}
                    animate={isActive ? 'active' : 'inactive'}
                />

                {/* Frame with the svg icon */}
                <Frame
                    className="IconButtonBottom"
                    position={'relative'}
                    width={30}
                    height={30}
                    background={transparent}
                >
                    <svg style={iconStyle} viewBox="0 0 24 24">
                        <path
                            fill={isActive ? activeColor : '#000'}
                            d={iconData}
                        />
                    </svg>
                </Frame>

                {/* Frame with the text */}
                <Frame
                    className="TextButtonBottom"
                    position={'relative'}
                    height={35}
                    width={10}
                    background={transparent}
                    variants={variantsText}
                    color={activeColor}
                    initial="inactive"
                    animate={isActive ? 'active' : 'inactive'}
                >
                    <span
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '700'
                        }}
                    >
                        {buttonTitle}
                    </span>
                </Frame>

                {/* Frame that has a onClick - clicking on SVG was not reliable */}
                <Frame
                    className="Controller"
                    position={'relative'}
                    background={transparent}
                    height={50}
                    width={50}
                    onClick={() => changePage(this.state.id)}
                />
            </div>
        );
    }
}

export default ButtonBottomNav;
