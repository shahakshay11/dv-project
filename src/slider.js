import * as d3 from "d3";
import * as slider from "d3-simple-slider";
import Map from "./map";

console.log(slider);

const Slider = {
    svg: {},
    data: ["All", "$", "$$", "$$$", "$$$$"],
    height: 200,
    margin: 75,
    load: function() {

        const container = document.querySelector('.slider-vertical');
        this.height = container.getBoundingClientRect().height;

        const sliderVertical = slider.sliderLeft()
            .min(0)
            .max(4)
            .tickValues([0, 1, 2, 3, 4])
            .tickFormat((d) => this.data[d])
            .height(this.height - this.margin)
            .step(1)
            .on("onchange", val => {
                if (val == 0) {
                    Map.filter.price = 0;
                    Map.resetMarker();
                    return;
                }
                Map.filter.price = val;
                Map.filterMarker();
            });
        
        const gVertical = d3.select('.slider-vertical')
            .append('svg')
            .attr('width', 100)
            .attr('height', 400)
            .append('g')
            .attr('transform', 'translate(60,30)');
        
        gVertical.call(sliderVertical);

        // d3.select('p#value-vertical').text(d3.format('.2%')(sliderVertical.value()));
    }
};

export default Slider;
