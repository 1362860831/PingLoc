import pandas as pd
import numpy as np
import os
import random

def k_fold_split(train,k):
    os.system("mkdir"+r"D:\Designer\TEST_HASH\data")
    k_fold=[]
    index=set(range(train.shape[0]))
    for i in range(k):
        #防止所有数据不能整除k，最后将剩余的都放到最后一折
        if i==k-1:
            k_fold.append(list(index))
        else:
            tmp=random.sample(list(index),int(1.0/k*train.shape[0]))
            k_fold.append(tmp)
            index-=set(tmp)
    #将原始训练集划分为k个包含训练集和验证集的训练集，同时每个训练集中，训练集：验证集=k-1:1
    for i in range(k):
        print("第{}折........".format(i+1))
        tra=[]
        dev=k_fold[i]
        for j in range(k):
            if i!=j:
                tra+=k_fold[j]
        train.iloc[tra].to_csv(r"D:\Designer\TEST_HASH\data\train_{}.csv".format(i),sep=",",index=False)
        train.iloc[dev].to_csv(r"D:\Designer\TEST_HASH\data\val_{}.csv".format(i),sep=",",index=False)
    print("done!")


def run_k_fold_split(k):
	print("Split Dataset Now...")
	data_path = r"D:\Designer\TEST_HASH\train_data.xls"

	dataset = pd.read_excel(data_path,sheet_name='train_data',header=0)
#	dataset = dataset.dropna(axis=0,how='any')
#	dataset=dataset.sample(frac=1.0)
	dataset=dataset.reset_index(drop=True)

	k_fold_split(dataset,k)


 
