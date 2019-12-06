import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import * as d3 from "d3";
import { DimensionsType, ScaleType } from "../../utils/types";

@Component({
  selector: "[appAxis]",
  templateUrl: "./axis.component.html",
  styleUrls: ["./axis.component.css"],
})
export class AxisComponent implements OnChanges {
  @Input() dimensions: DimensionsType;
  @Input() dimension: "x" | "y" = "x";
  @Input() scale: ScaleType;
  @Input() label: string;

  // In order to use d3.select() to grab an element, we’ll need to use an ElementRef. Let’s create a new ElementRef named axis.
  @ViewChild("axis", { static: true }) axis: ElementRef;

  // Whenever our data changes, update our axis
  ngOnChanges() {
    this.updateTicks();
  }

  // Generates a d3 axis on our targeted element
  updateTicks() {
    const yAxisGenerator = d3.axisLeft().scale(this.scale);
    const yAxis = d3.select(this.axis.nativeElement).call(yAxisGenerator);
    d3.select(this.axis.nativeElement);
  }
}
