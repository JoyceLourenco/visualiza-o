import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as d3 from "d3";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType, AccessorType } from "../utils/types";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"],
})
export class TimelineComponent {
  // Note that our properties are flexible enough so we could use any dataset with our timeline component
  @Input() data: object[];
  @Input() label: string;
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;

  public dimensions: DimensionsType;

  // Use ViewChild to hook onto an element in our template
  // NOTE: Starting with Angular 8, we need to add the second parameter to ViewChild. This will ensure our container is ready by the time we want to use it.
  @ViewChild("container", { static: true }) container: ElementRef;

  constructor() {
    this.dimensions = {
      marginTop: 40,
      marginRight: 30,
      marginBottom: 75,
      marginLeft: 75,
      height: 300,
      width: 600,
    };

    // Calculate the bounded height and width of our timeline
    this.dimensions = {
      ...this.dimensions,
      boundedHeight: Math.max(
        this.dimensions.height -
          this.dimensions.marginTop -
          this.dimensions.marginBottom,
        0
      ),
      boundedWidth: Math.max(
        this.dimensions.width -
          this.dimensions.marginLeft -
          this.dimensions.marginRight,
        0
      ),
    };
  }
}
