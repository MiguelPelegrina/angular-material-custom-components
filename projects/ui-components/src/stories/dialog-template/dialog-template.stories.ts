import { Meta, moduleMetadata, StoryObj  } from "@storybook/angular";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { LaunchDialogComponent } from "../../lib/launch-dialog/launch-dialog.component";
import { MatButtonModule } from "@angular/material/button";

type Story = StoryObj<LaunchDialogComponent>

export const Default: Story = {
  args: {
    title: 'Testing',
    width: '200px'
  }
}

// TODO Check for better implementation
const meta: Meta<LaunchDialogComponent> = {
  title: 'Launch Dialog template',
  component: LaunchDialogComponent,
  tags:['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [LaunchDialogComponent, MatButtonModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {title: Default.args?.title, width: Default.args?.width }},
        { provide: MAT_DIALOG_DATA, useValue:  {title: Default.args?.title, width: Default.args?.width } }
      ]
    })
  ]
}

export default meta;

