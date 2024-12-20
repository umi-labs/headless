import React from "react";
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check,
  CheckCircle,
  Clock,
  Eye,
  Headphones,
  InstagramLogo,
  Rocket,
  TwitterLogo,
} from "@phosphor-icons/react";
import { Type } from "./schema.ts";

export type IconProps = Type & React.HTMLAttributes<HTMLOrSVGElement>;

const Icon = (props: IconProps): React.ReactNode => {
  switch (props.type) {
    case "eye":
      return <Eye {...props} />;
    case "rocket":
      return <Rocket {...props} />;
    case "check":
      return <Check {...props} />;
    case "check-circle":
      return <CheckCircle {...props} />;
    case "instagram":
      return <InstagramLogo {...props} />;
    case "twitter":
      return <TwitterLogo {...props} />;
    case "caret-up":
      return <CaretUp {...props} />;
    case "caret-down":
      return <CaretDown {...props} />;
    case "caret-left":
      return <CaretLeft {...props} />;
    case "caret-right":
      return <CaretRight {...props} />;
    case "headphones":
      return <Headphones {...props} />;
    case "clock":
      return <Clock {...props} />;
  }
};

export default Icon;
