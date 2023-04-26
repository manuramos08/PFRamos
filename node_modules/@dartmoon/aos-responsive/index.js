import AOS from 'aos'
import $ from 'jquery'

/**
 * Breakpoints copied from tailwindcss (https://tailwindcss.com/docs/breakpoints)
 */
let breakpoints = [
    {
        name: 'sm',
        minWidth: 640,
    },
    {
        name: 'md',
        minWidth: 768,
    },
    {
        name: 'lg',
        minWidth: 1024,
    },
    {
        name: 'xl',
        minWidth: 1280,
    },
    {
        name: '2xl',
        minWidth: 1536,
    },
]

/**
 * List of supported AOS data-aos-* attributes
 */
let attributes = [
    'aos',
    'aos-offset',
    'aos-delay',
    'aos-duration',
    'aos-easing',
    'aos-mirror',
    'aos-once',
    'aos-anchor-placement',
]

/**
 * Let's substiute the data-aos-* attributes with the
 * best fit based on the current viewport size.
 */
function initAOSResponsive() {
    // Let's measure the viewport width
    // to find the last applicable breakpoint
    let viewportWidth = window.innerWidth

    // Let's loop through the breakpoints
    for (let i = 0; i < breakpoints.length; i++) {
        // If the viewport width is less than the
        // minWidth of the current breakpoint
        // break out of the loop because the next
        // breakpoint will not be applicable
        if (viewportWidth < breakpoints[i].minWidth) {
            break
        }

        let breakpoint = breakpoints[i].name

        // Loop through the attributes and
        // override the data-aos-* attributes
        // with the best fit
        for (let j = 0; j < attributes.length; j++) {
            let attribute = attributes[j]
        
            // Let's find elements that have
            // the data-[breakpoint]-aos-* attribute
            let $elements = $('[data-' + breakpoint + '-' + attribute + ']')

            // Loop through the elements
            $elements.each(function() {
                // Let's get the value of the attribute
                // and substituite it to the data-aos-* attribute
                let value = $(this).data(breakpoint + '-' + attribute)
                $(this).attr('data-' + attribute, value)
            })
        }
    }
}

/**
 * Set breakpoints and order them by value
 */
function setBreakpoints(conf) {

    // Set the new breakpoints
    breakpoints = [];
    for (let key in conf) {
        breakpoints.push({
            name: key,
            minWidth: conf[key],
        })
    }

    // Sort the breakpoints by minWidth
    breakpoints.sort((a, b) => a.minWidth - b.minWidth)
}

/**
 * Initialize AOS responsive compiling data-aos-* attributes
 * and then initiating the real AOS
 * 
 * @param {Object} options
 */
const init = function init(conf) {
    // If breakpoints is present into conf
    // merge them from conf, then remove them from conf
    if ('breakpoints' in conf) {
        setBreakpoints(conf.screen)
        delete conf.breakpoints
    }

    // If the user overrided the attributes
    if ('attributes' in conf) {
        attributes = conf.attributes
        delete conf.attributes
    }

    // First thing we need to do is compiling the data-aos-* attributes
    initAOSResponsive()

    // Finally, we can initiate the AOS
    // This is a workaround because initiating AOS
    // directly didn't use the overrided properties
    // but wrapping it around a setTimeout worked correctly
    setTimeout(() => {
        AOS.init(conf)
    }, 1)
}

export default {
    init
}