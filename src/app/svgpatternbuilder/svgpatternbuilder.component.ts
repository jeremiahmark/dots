import { Component } from '@angular/core';

@Component({
  selector: 'app-svgpatternbuilder',
  template: `
    <div class="container">
      <h2>SVG Pattern Builder</h2>
      
      <div class="form-group">
        <label for="patternType">Pattern Type:</label>
        <select id="patternType" [(ngModel)]="patternType">
          <option value="dot">Dot</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="line">Line</option>
          <option value="plus">Plus</option>
          <option value="corner">Corner</option>
          <option value="star">Star</option>
          <option value="hexagon">Hexagon</option>
          <option value="cross">Cross</option>
          <option value="circle">Circle</option>
          <option value="heart">Heart</option>
        </select>
      </div>

      <div class="form-group">
        <label for="size">Size: {{ size }}</label>
        <input type="range" id="size" [(ngModel)]="size" min="1" max="20" step="1">
      </div>
      
      <div class="form-group">
        <label for="spacing">Spacing: {{ spacing }}</label>
        <input type="range" id="spacing" [(ngModel)]="spacing" min="10" max="50" step="1">
      </div>
      
      <div class="form-group">
        <label for="rotation">Rotation: {{ rotation }}°</label>
        <input type="range" id="rotation" [(ngModel)]="rotation" min="0" max="360" step="1">
      </div>
      
      <div class="form-group">
        <label for="color">Color:</label>
        <input type="color" id="color" [(ngModel)]="color">
      </div>
      
      <svg [attr.width]="svgSize" [attr.height]="svgSize">
        <defs>
          <pattern [id]="patternId" [attr.width]="spacing" [attr.height]="spacing" patternUnits="userSpaceOnUse">
            <g [attr.transform]="'rotate(' + rotation + ' ' + spacing/2 + ' ' + spacing/2 + ')'">
              <ng-container [ngSwitch]="patternType">
                <circle *ngSwitchCase="'dot'" 
                  [attr.cx]="spacing / 2" [attr.cy]="spacing / 2" [attr.r]="size / 2" [attr.fill]="color" />
                <rect *ngSwitchCase="'square'" 
                  [attr.x]="spacing / 2 - size / 2" [attr.y]="spacing / 2 - size / 2" 
                  [attr.width]="size" [attr.height]="size" [attr.fill]="color" />
                <polygon *ngSwitchCase="'triangle'" 
                  [attr.points]="trianglePoints" [attr.fill]="color" />
                <line *ngSwitchCase="'line'" 
                  [attr.x1]="0" [attr.y1]="spacing / 2" [attr.x2]="spacing" [attr.y2]="spacing / 2" 
                  [attr.stroke]="color" [attr.stroke-width]="size" />
                <g *ngSwitchCase="'plus'">
                  <rect [attr.x]="spacing / 2 - size / 6" [attr.y]="0" 
                    [attr.width]="size / 3" [attr.height]="spacing" [attr.fill]="color" />
                  <rect [attr.x]="0" [attr.y]="spacing / 2 - size / 6" 
                    [attr.width]="spacing" [attr.height]="size / 3" [attr.fill]="color" />
                </g>
                <path *ngSwitchCase="'corner'" 
                  [attr.d]="cornerPath" [attr.stroke]="color" [attr.stroke-width]="size / 2" fill="none" />
                <polygon *ngSwitchCase="'star'" 
                  [attr.points]="starPoints" [attr.fill]="color" />
                <polygon *ngSwitchCase="'hexagon'" 
                  [attr.points]="hexagonPoints" [attr.fill]="color" />
                <g *ngSwitchCase="'cross'">
                  <rect [attr.x]="spacing / 2 - size / 6" [attr.y]="0" 
                    [attr.width]="size / 3" [attr.height]="spacing" [attr.fill]="color" />
                  <rect [attr.x]="0" [attr.y]="spacing / 2 - size / 6" 
                    [attr.width]="spacing" [attr.height]="size / 3" [attr.fill]="color" />
                </g>
                <circle *ngSwitchCase="'circle'" 
                  [attr.cx]="spacing / 2" [attr.cy]="spacing / 2" [attr.r]="size / 2" 
                  [attr.stroke]="color" [attr.stroke-width]="size / 6" fill="none" />
                <g *ngSwitchCase="'heart'" 
                   [attr.transform]="'translate(' + (spacing/2 - size/2) + ',' + (spacing/2 - size/2) + ') scale(' + (size/24) + ')'">
                  <path [attr.d]="heartPath" [attr.fill]="color" [attr.stroke]="color" stroke-width="2" 
                        stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </ng-container>
            </g>
          </pattern>
        </defs>
        <rect [attr.width]="svgSize" [attr.height]="svgSize" [attr.fill]="'url(#' + patternId + ')'" />
      </svg>
      
      <div class="svg-code">
        <h3>SVG Code:</h3>
        <pre>{{ svgCode }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .container {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input[type="range"], select {
      width: 100%;
    }
    svg {
      border: 1px solid #ccc;
      margin-top: 20px;
    }
    .svg-code {
      margin-top: 20px;
    }
    pre {
      background-color: #f4f4f4;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class SvgPatternBuilderComponent {
  patternType = 'dot';
  size = 10;
  spacing = 20;
  rotation = 0;
  color = '#000000';
  patternId = 'customPattern';
  svgSize = 200;

  heartPath = "M12 20V5.99995M12 5.99995C10.2006 3.90293 7.19377 3.25485 4.93923 5.17509C2.68468 7.09533 2.36727 10.3059 4.13778 12.577C5.60984 14.4652 10.0648 18.4477 11.5249 19.7366C11.6882 19.8808 11.7699 19.9529 11.8652 19.9813C11.9483 20.006 12.0393 20.006 12.1225 19.9813C12.2178 19.9529 12.2994 19.8808 12.4628 19.7366C13.9229 18.4477 18.3778 14.4652 19.8499 12.577C21.6204 10.3059 21.3417 7.07513 19.0484 5.17509C16.7551 3.27505 13.7994 3.90293 12 5.99995Z";

  get trianglePoints(): string {
    const height = this.size * Math.sqrt(3) / 2;
    const halfSpacing = this.spacing / 2;
    const halfSize = this.size / 2;
    return `${halfSpacing},${halfSpacing - height/2} ${halfSpacing - halfSize},${halfSpacing + height/2} ${halfSpacing + halfSize},${halfSpacing + height/2}`;
  }

  get cornerPath(): string {
    const halfSpacing = this.spacing / 2;
    return `M0,${halfSpacing} L${halfSpacing},${halfSpacing} L${halfSpacing},0`;
  }

  get starPoints(): string {
    const outerRadius = this.size / 2;
    const innerRadius = outerRadius / 2;
    const centerX = this.spacing / 2;
    const centerY = this.spacing / 2;
    let points = '';
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = Math.PI * i / 5;
      const x = centerX + radius * Math.sin(angle);
      const y = centerY - radius * Math.cos(angle);
      points += `${x},${y} `;
    }
    return points.trim();
  }

  get hexagonPoints(): string {
    const radius = this.size / 2;
    const centerX = this.spacing / 2;
    const centerY = this.spacing / 2;
    let points = '';
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points += `${x},${y} `;
    }
    return points.trim();
  }

  get svgCode(): string {
    let patternContent = '';
    switch (this.patternType) {
      case 'dot':
        patternContent = `<circle cx="${this.spacing / 2}" cy="${this.spacing / 2}" r="${this.size / 2}" fill="${this.color}" />`;
        break;
      case 'square':
        patternContent = `<rect x="${this.spacing / 2 - this.size / 2}" y="${this.spacing / 2 - this.size / 2}" width="${this.size}" height="${this.size}" fill="${this.color}" />`;
        break;
      case 'triangle':
        patternContent = `<polygon points="${this.trianglePoints}" fill="${this.color}" />`;
        break;
      case 'line':
        patternContent = `<line x1="0" y1="${this.spacing / 2}" x2="${this.spacing}" y2="${this.spacing / 2}" stroke="${this.color}" stroke-width="${this.size}" />`;
        break;
      case 'plus':
        patternContent = `
          <rect x="${this.spacing / 2 - this.size / 6}" y="0" width="${this.size / 3}" height="${this.spacing}" fill="${this.color}" />
          <rect x="0" y="${this.spacing / 2 - this.size / 6}" width="${this.spacing}" height="${this.size / 3}" fill="${this.color}" />`;
        break;
      case 'corner':
        patternContent = `<path d="${this.cornerPath}" stroke="${this.color}" stroke-width="${this.size / 2}" fill="none" />`;
        break;
      case 'star':
        patternContent = `<polygon points="${this.starPoints}" fill="${this.color}" />`;
        break;
      case 'hexagon':
        patternContent = `<polygon points="${this.hexagonPoints}" fill="${this.color}" />`;
        break;
      case 'cross':
        patternContent = `
          <rect x="${this.spacing / 2 - this.size / 6}" y="0" width="${this.size / 3}" height="${this.spacing}" fill="${this.color}" />
          <rect x="0" y="${this.spacing / 2 - this.size / 6}" width="${this.spacing}" height="${this.size / 3}" fill="${this.color}" />`;
        break;
      case 'circle':
        patternContent = `<circle cx="${this.spacing / 2}" cy="${this.spacing / 2}" r="${this.size / 2}" stroke="${this.color}" stroke-width="${this.size / 6}" fill="none" />`;
        break;
        case 'heart':
          patternContent = `
            <g transform="translate(${this.spacing/2},${this.spacing/2}) scale(${this.size/24})">
              <path d="${this.heartPath}" 
                    stroke="${this.color}" 
                    stroke-width="2" 
                    fill="white" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>`;
        break;
    }

    return `<svg width="${this.svgSize}" height="${this.svgSize}">
  <defs>
    <pattern id="${this.patternId}" width="${this.spacing}" height="${this.spacing}" patternUnits="userSpaceOnUse">
      <g transform="rotate(${this.rotation} ${this.spacing/2} ${this.spacing/2})">
        ${patternContent}
      </g>
    </pattern>
  </defs>
  <rect width="${this.svgSize}" height="${this.svgSize}" fill="url(#${this.patternId})" />
</svg>`;
  }
}