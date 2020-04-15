clear;
clc;

LOSS_FLAG=800;
LOSS_FLAG_NUM = 1;
LEAST_DATA_NUM = 25;
LEAST_DATA_SIZE = 150;                                 %the least data to use per table for the furrher work
OFFSET_RANGE=50;

dirOutput=dir(fullfile('./','*.xls'));
filenames={dirOutput.name};
[~,file_numbers]=size(filenames);

DATASET_LENGTH=[];
FILENAME = {};

for i=1:file_numbers
    temp_filename = filenames(i);
    temp_filename = temp_filename{1};
    temp_table = xlsread(temp_filename,temp_filename(1:end-5));     %表名实际上不等于文件名，因为表名最大长度不够被截断了
    to_delete_row=[];
    [data_length,~] =size(temp_table);
    for j=1:data_length
        num_of_bad_ping=length(find(temp_table(j,:)>=LOSS_FLAG));
        if (num_of_bad_ping>=LOSS_FLAG_NUM)
            to_delete_row=[to_delete_row,j];                                   %判为丢包
        end
    end
    temp_table(to_delete_row,:)=[];
    [data_length,~]=size(temp_table);
    if (data_length<=LEAST_DATA_NUM)
        delete(temp_filename);
    else
        delete(temp_filename);
        disp(length(temp_table))
        rotation_table = temp_table;
        [r,c] = size(temp_table);
        [m,~]=size(rotation_table);
        while m<LEAST_DATA_SIZE
            offset=OFFSET_RANGE*rand(r,c)-OFFSET_RANGE/2;
            rotation_table = [rotation_table;temp_table+offset];
            [m,~]=size(rotation_table);
        end
        temp_table = rotation_table;
        DATASET_LENGTH=[DATASET_LENGTH;length(temp_table)];
        FILENAME = [FILENAME;temp_filename];
        xlswrite(temp_filename,temp_table,temp_filename(1:end-5));
    end
end