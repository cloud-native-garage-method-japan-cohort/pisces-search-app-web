import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  CloudUpload as CloudUploadIcon,
} from "@material-ui/icons";
import { uploadToDiscovery } from "../../utils/index"

const FileUploader = (props) => {
  const [fileType, setFileType] = useState("PDF");
  const [file, setFile] = useState(undefined);
  const [inUploading, setInUploading] = useState(false);

  const onChangeFileType = useCallback((event) => {
    setFileType(event.target.value);
  }, [fileType, setFileType]);
  const onChangeFile = useCallback((event) => {
    setFile(event.target.files[0]);
  }, [file, setFile]);
  const onClickUpload = useCallback((event) => {
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      console.log(fileReader.result);
      setInUploading(true);
      await uploadToDiscovery(fileType, file.name, fileReader.result);
      setInUploading(false);
      props.onClose();
    };
    fileReader.readAsText(file);
  }, [fileType, file, inUploading]);

  const content = inUploading ? (
    <Box width="100%" display="flex">
      <Box margin="auto">
        <CircularProgress />
      </Box>
    </Box>
  ):(
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="file-type-select-label">File type</InputLabel>
          <Select labelId="file-type-select-label" value={fileType} onChange={onChangeFileType}>
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="Word">Word</MenuItem>
            <MenuItem value="PowerPoint">PowerPoint</MenuItem>
            <MenuItem value="Excel">Excel</MenuItem>
            <MenuItem value="JSON">JSON</MenuItem>
            <MenuItem value="HTML">HTML</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Input type="file" onChange={onChangeFile} />
        </FormControl>
      </Grid>
    </Grid>
  );

  return (
    <Dialog maxWidth="xs" open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>ファイルのアップロード</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.onClose} disabled={inUploading}>CANCEL</Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={onClickUpload}
          disabled={inUploading}
        >
          UPLOAD
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploader;